// 📩 Custom Quote → Feishu (Cloudflare Pages Function)
// 定制页询价 → 飞书通知

async function getTenantToken(env) {
  const res = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: env.FEISHU_APP_ID, app_secret: env.FEISHU_APP_SECRET }),
  });
  if (!res.ok) throw new Error(`Feishu auth: ${res.status}`);
  const data = await res.json();
  return data.tenant_access_token;
}

function buildCard(body) {
  return {
    config: { wide_screen_mode: true },
    header: {
      title: { tag: "plain_text", content: "🧵 Custom Quote Request — boazclothes.com" },
      template: "indigo",
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
            "",
            `**Product:** ${body.product || "—"}`,
            `**Color:** ${body.color || "—"}`,
            `**Decoration:** ${body.method || "—"}`,
            `**Placement:** ${body.placement || "—"}`,
            `**Quantity:** ${body.quantity || "—"}`,
            `**Time:** ${new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai", hour12: false })} CST`,
          ].join("\n"),
        },
      },
      { tag: "hr" },
      ...(body.message
        ? [{ tag: "div", text: { tag: "lark_md", content: `**Details:**\n${body.message}` } }, { tag: "hr" }]
        : []),
      {
        tag: "action",
        actions: [
          {
            tag: "button",
            text: { tag: "plain_text", content: "✉️ Reply" },
            type: "primary",
            multi_url: { url: `mailto:${body.email}?subject=Re: Custom Quote from ${encodeURIComponent(body.company || body.name)}` },
          },
          ...(body.phone
            ? [{
                tag: "button",
                text: { tag: "plain_text", content: "💬 WhatsApp" },
                type: "default",
                multi_url: { url: `https://wa.me/${body.phone.replace(/[^0-9]/g, "")}` },
              }]
            : []),
        ],
      },
    ],
  };
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (!env.FEISHU_APP_ID || !env.FEISHU_APP_SECRET) {
    return new Response(JSON.stringify({ success: true, note: "submitted (no notification)" }), {
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
    const openId = env.FEISHU_USER_OPEN_ID || "ou_beec7c4f13589d61fbf39ca28d61cf39";
    const card = buildCard(body);

    await fetch(`https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id`, {
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
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[CustomQuote] Error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
