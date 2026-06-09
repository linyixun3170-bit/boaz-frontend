// 📩 Contact Form → Feishu Bitable + Notification
// 网站表单提交 → 飞书多维表格记录 + Bot 卡片通知 + 邮件兜底

const BITABLE_APP_TOKEN = "GySHbb1LJa4XTaso87BcGKKWncb";
const BITABLE_TABLE_ID = "tblAFoXji5JLlEvM";

// Bitable API uses field NAMES (not field IDs)
const FIELDS = {
  name: "姓名",
  company: "公司",
  email: "邮箱",
  phone: "电话",
  wechat: "微信",
  country: "国家/地区",
  address: "收货地址",
  inquiryType: "需求类型",
  quantity: "数量",
  message: "留言",
  status: "报价状态",
  notes: "备注",
  ip: "IP地址",
};

// Status option names
const STATUS_OPTIONS = {
  pending: "待报价",
  quoted: "已报价",
  following: "跟进中",
  closed: "已关闭",
  won: "已成交",
};

// Inquiry type option names
const INQUIRY_OPTIONS = {
  wholesale: "批发报价",
  custom: "定制生产",
  sample: "样品申请",
  "private-label": "贴牌",
  partnership: "其他",
  other: "其他",
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

async function addRecordToBitable(token, body, headers) {
  const COUNTRY_MAP = {
    "US": "United States", "GB": "United Kingdom", "CA": "Canada",
    "AU": "Australia", "DE": "Germany", "FR": "France",
    "IT": "Italy", "ES": "Spain", "NL": "Netherlands",
    "JP": "Japan", "KR": "South Korea", "SG": "Singapore",
    "HK": "Hong Kong", "TW": "Taiwan", "CN": "China",
    "IN": "India", "BR": "Brazil", "MX": "Mexico",
    "AE": "UAE", "SA": "Saudi Arabia", "ZA": "South Africa",
    "SE": "Sweden", "CH": "Switzerland", "NO": "Norway",
    "DK": "Denmark", "FI": "Finland", "IE": "Ireland",
    "AT": "Austria", "BE": "Belgium", "PT": "Portugal",
    "GR": "Greece", "PL": "Poland", "RU": "Russia",
    "TR": "Turkey", "IL": "Israel", "NZ": "New Zealand",
    "MY": "Malaysia", "TH": "Thailand", "VN": "Vietnam",
    "PH": "Philippines", "ID": "Indonesia", "EG": "Egypt",
    "NG": "Nigeria", "KE": "Kenya",
  };

  const ip = headers.get("CF-Connecting-IP") || body.ip || "";
  const countryCode = headers.get("CF-IPCountry") || "";
  const countryName = COUNTRY_MAP[countryCode] || countryCode || "";

  const fields = {
    [FIELDS.name]: body.name || "",
    [FIELDS.company]: body.company || "",
    [FIELDS.email]: body.email || "",
    [FIELDS.phone]: body.phone || "",
    [FIELDS.wechat]: body.wechat || "",
    [FIELDS.country]: body.country || countryName || "",
    [FIELDS.address]: body.address || "",
    [FIELDS.inquiryType]: body.inquiryType ? INQUIRY_OPTIONS[body.inquiryType] || INQUIRY_OPTIONS.other : INQUIRY_OPTIONS.other,
    [FIELDS.quantity]: body.quantity || "",
    [FIELDS.message]: body.message || "",
    [FIELDS.status]: STATUS_OPTIONS.pending,
    [FIELDS.notes]: `Submitted from boaz-clothes.com`,
    [FIELDS.ip]: ip,
  };

  const res = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${BITABLE_TABLE_ID}/records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fields }),
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
      title: { tag: "plain_text", content: "📩 New Inquiry — boaz-clothes.com" },
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

// 📧 邮件兜底 — 飞书通知失败时发邮件
async function sendFallbackEmail(body, env) {
  const to = env.EMAIL_FALLBACK_TO;
  if (!to) return;

  const labels = {
    wholesale: "Wholesale Pricing",
    custom: "Custom Manufacturing",
    sample: "Request Samples",
    "private-label": "Private Label",
    partnership: "Partnership",
    other: "Other",
  };

  const subject = `[New Inquiry] ${body.company || body.name} — ${labels[body.inquiryType] || body.inquiryType || "General"}`;
  const text = [
    `Name: ${body.name || "—"}`,
    `Email: ${body.email || "—"}`,
    `Company: ${body.company || "—"}`,
    `Phone: ${body.phone || "—"}`,
    `WeChat: ${body.wechat || "—"}`,
    `Inquiry Type: ${labels[body.inquiryType] || body.inquiryType || "—"}`,
    `Quantity: ${body.quantity || "—"}`,
    `Message: ${body.message || "—"}`,
    `Time: ${new Date().toISOString()}`,
  ].join("\n");

  // SendGrid
  try {
    const msg = {
      personalizations: [{ to: [{ email: to }] }],
      from: { email: env.EMAIL_FROM || "noreply@boaz-clothes.com" },
      subject,
      content: [{ type: "text/plain", value: text }],
    };
    await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.SENDGRID_API_KEY || ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    });
    console.log("[Contact] Fallback email sent to", to);
  } catch (e) {
    console.error("[Contact] Fallback email failed:", e);
  }
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
    let feishuOk = true;
    let recordId = null;

    // 1. Write to Bitable
    try {
      recordId = await addRecordToBitable(token, body, request.headers);
      console.log("[Contact] Bitable record created:", recordId);
    } catch (e) {
      feishuOk = false;
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
      feishuOk = false;
      console.error("[Contact] Failed to send notification:", e);
    }

    // 3. 飞书失败 → 邮件兜底
    if (!feishuOk) {
      console.log("[Contact] Feishu failed, trying email fallback...");
      await sendFallbackEmail(body, env);
    }

    return new Response(JSON.stringify({ success: true, recordId }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Contact] Error:", err);

    // 兜底：异常时也尝试发邮件
    try {
      const body = await request.json().catch(() => ({}));
      await sendFallbackEmail(body, env);
    } catch (_) {}

    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
