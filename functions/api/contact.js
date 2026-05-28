// 📩 Contact Form → Feishu (Cloudflare Pages Function)
// 网站表单提交 → 飞书 Bot 通知

const FEISHU_APP_ID = () => typeof FEISHU_APP_ID_VAR !== "undefined" ? FEISHU_APP_ID_VAR : "";
// We'll use context.env provided by CF Pages runtime

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
    console.warn("[Contact] Missing Feishu credentials — skipping notification");
    return new Response(JSON.stringify({ success: true, note: "submitted (no notification)" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return new Response(JSON.stringify({ error: "Name, email, and message are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = await getTenantToken(env);
    const openId = env.FEISHU_USER_OPEN_ID || "ou_beec7c4f13589d61fbf39ca28d61cf39";

    const card = buildCard(body);

    const res = await fetch(
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

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Contact] Feishu send failed:", errText);
    }

    return new Response(JSON.stringify({ success: true }), {
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
