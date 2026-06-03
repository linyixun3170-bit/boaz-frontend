// 📩 Contact Form → Feishu Bitable + Notification
// 网站表单提交 → 飞书多维表格记录 + Bot 卡片通知

const BITABLE_APP_TOKEN = "GySHbb1LJa4XTaso87BcGKKWncb";
const BITABLE_TABLE_ID = "tblAFoXji5JLlEvM";

// Field ID mapping
const FIELDS = {
  name: "fldZOSWZq2",
  company: "fldPj993Ab",
  email: "fldApy1CY4",
  phone: "fld4NAFPBt",
  wechat: "fldl6wmE9e",
  inquiryType: "fldLr0dNAB",
  quantity: "fldmdlU0uk",
  message: "fld9JTABOT",
  status: "fldXC6F5M4",
  notes: "fldF6U0ODU",
};

// Status option IDs (from bitable)
const STATUS_OPTIONS = {
  pending: "opt4HLiOhG",    // 待报价
  quoted: "optXFWIbst",     // 已报价
  following: "optqPrKhXL",  // 跟进中
  closed: "optZgRM2jw",     // 已关闭
  won: "opt0O3pkML",        // 已成交
};

// Inquiry type option IDs (from bitable)
const INQUIRY_OPTIONS = {
  wholesale: "optzDxNefc",      // 批发报价
  custom: "opth6siWIJ",         // 定制生产
  sample: "opttXwyv7K",         // 样品申请
  "private-label": "optMi9RHrI", // 贴牌
  partnership: "opt4l8qPz6",    // 其他
  other: "opt4l8qPz6",          // 其他
};

async function getTenantToken(env) {
  const res = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: env.FEISHU_APP_ID,
      app_secret: env.FEISHU_APP_SECRET,
    }),
  });
  if (!res.ok) throw new Error(`Feishu auth: ${res.status}`);
  const data = await res.json();
  return data.tenant_access_token;
}

async function addRecordToBitable(token, body) {
  const fields = {
    [FIELDS.name]: body.name || "",
    [FIELDS.company]: body.company || "",
    [FIELDS.email]: body.email || "",
    [FIELDS.phone]: body.phone || "",
    [FIELDS.wechat]: body.wechat || "",
    [FIELDS.inquiryType]: body.inquiryType ? INQUIRY_OPTIONS[body.inquiryType] || INQUIRY_OPTIONS.other : INQUIRY_OPTIONS.other,
    [FIELDS.quantity]: body.quantity || "",
    [FIELDS.message]: body.message || "",
    [FIELDS.status]: STATUS_OPTIONS.pending,
    [FIELDS.notes]: `Submitted from boazclothes.com`,
  };

  const res = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${BITABLE_TABLE_ID}/records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fields,
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error("[Contact] Bitable write failed:", errText);
    throw new Error(`Bitable write: ${res.status}`);
  }

  const data = await res.json();
  return data.data?.record?.record_id;
}

function buildCard(body) {
  const labels = {
    wholesale: "Wholesale Pricing",
    custom: "Custom Manufacturing",
    sample: "Request Samples",
    "private-label": "Private Label",
    partnership: "Partnership",
    other: "Other",
  };

  return {
    config: { wide_screen_mode: true },
    header: {
      title: { tag: "plain_text", content: "📩 New Inquiry — boazclothes.com" },
      template: "blue",
    },
    elements: [
      {
        tag: "div",
        text: {
          tag: "lark_md",
          content: [
            `**Name:** ${body.name || "—"}`,
            `**Email:** ${body.email || "—"}`,
            `**Company:** ${body.company || "—"}`,
            `**Phone:** ${body.phone || "—"}`,
            `**WeChat:** ${body.wechat || "—"}`,
            `**Type:** ${labels[body.inquiryType] || body.inquiryType || "—"}`,
            `**Quantity:** ${body.quantity || "—"}`,
            `**Time:** ${new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai", hour12: false })} CST`,
          ].join("\n"),
        },
      },
      { tag: "hr" },
      { tag: "div", text: { tag: "lark_md", content: `**Message:**\n${body.message || "—"}` } },
      ...(body.email
        ? [
            { tag: "hr" },
            {
              tag: "action",
              actions: [
                {
                  tag: "button",
                  text: { tag: "plain_text", content: "✉️ Reply" },
                  type: "primary",
                  multi_url: { url: `mailto:${body.email}?subject=Re: Inquiry from ${encodeURIComponent(body.company || body.name)}` },
                },
                ...(body.phone
                  ? [
                      {
                        tag: "button",
                        text: { tag: "plain_text", content: "💬 WhatsApp" },
                        type: "default",
                        multi_url: { url: `https://wa.me/${body.phone.replace(/[^0-9]/g, "")}` },
                      },
                    ]
                  : []),
              ],
            },
          ]
        : []),
    ],
  };
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (!env.FEISHU_APP_ID || !env.FEISHU_APP_SECRET) {
    console.warn("[Contact] Missing Feishu credentials");
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();

    if (!body.name || !body.email) {
      return new Response(JSON.stringify({ error: "Name and email are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = await getTenantToken(env);

    // 1. Write to Bitable
    let recordId = null;
    try {
      recordId = await addRecordToBitable(token, body);
      console.log("[Contact] Bitable record created:", recordId);
    } catch (e) {
      console.error("[Contact] Failed to write bitable:", e);
    }

    // 2. Send Feishu notification card
    try {
      const card = buildCard(body);
      const openId = env.FEISHU_USER_OPEN_ID || "ou_beec7c4f13589d61fbf39ca28d61cf39";

      await fetch(
        `https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            receive_id: openId,
            msg_type: "interactive",
            content: JSON.stringify(card),
          }),
        }
      );
    } catch (e) {
      console.error("[Contact] Failed to send notification:", e);
    }

    return new Response(JSON.stringify({ success: true, recordId }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Contact] Error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
