// 📧 Generate AI Quote Draft & Store in Bitable
// POST /api/send-quote
// Body: { recordId, customerEmail, customerName, inquiryType, quantity, message }

const BITABLE_APP_TOKEN = "GySHbb1LJa4XTaso87BcGKKWncb";
const BITABLE_TABLE_ID = "tblAFoXji5JLlEvM";

const FIELDS = {
  name: "fldZOSWZq2", company: "fldPj993Ab", email: "fldApy1CY4",
  phone: "fld4NAFPBt", inquiryType: "fldLr0dNAB", quantity: "fldmdlU0uk",
  message: "fld9JTABOT", status: "fldXC6F5M4", notes: "fldF6U0ODU",
};

function buildPrompt(body) {
  return `You are a sales representative at BOAZ Apparel, a premium t-shirt and hoodie manufacturing company based in China (FOB Ningbo/Shanghai).

Draft a professional, warm quote reply email to a potential customer.

Customer Info:
- Name: ${body.name || "Customer"}
- Company: ${body.company || "N/A"}
- Email: ${body.email || "N/A"}
- Inquiry Type: ${body.inquiryType || "General"}
- Quantity: ${body.quantity || "To be discussed"}
- Their message: "${body.message || "No specific message"}"

Write in English. Keep it concise and professional (3-4 paragraphs max).
Include:
1. Thank them for reaching out
2. Acknowledge their specific needs
3. Briefly mention BOAZ strengths (50+ MOQ, OEM/ODM custom, samples available, FOB Ningbo)
4. Offer next steps (samples, tech pack review, WhatsApp discussion)
5. End with: Best regards, The BOAZ Team

Return ONLY the email HTML body. Use <p> and <br> tags only. No CSS, no markdown.`;
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await request.json();
    const { recordId } = body;

    // Get Feishu token
    const authRes = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app_id: env.FEISHU_APP_ID, app_secret: env.FEISHU_APP_SECRET }),
    });
    const authData = await authRes.json();
    const token = authData.tenant_access_token;

    // 1. Generate AI email draft
    const OR_KEY = env.OPENROUTER_KEY || "";
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OR_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [{ role: "user", content: buildPrompt(body) }],
      }),
    });
    const aiData = await aiRes.json();
    const emailHtml = aiData.choices?.[0]?.message?.content || "";
    const subject = `Quote: ${body.inquiryType || "Custom Apparel"} Inquiry | BOAZ Apparel`;

    // 2. Update bitable record with quote status and notes
    if (recordId && token) {
      await fetch(
        `https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${BITABLE_TABLE_ID}/records/${recordId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            fields: {
              [FIELDS.status]: "optXFWIbst", // 已报价
              [FIELDS.notes]: `✉️ Quote drafted on ${new Date().toLocaleDateString("zh-CN")}`,
            },
          }),
        }
      );

      // 3. Notify user via Feishu card with the drafted email
      const openId = env.FEISHU_USER_OPEN_ID || "ou_beec7c4f13589d61fbf39ca28d61cf39";
      await fetch("https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          receive_id: openId,
          msg_type: "interactive",
          content: JSON.stringify({
            config: { wide_screen_mode: true },
            header: { title: { tag: "plain_text", content: "📧 AI Quote Draft Ready" }, template: "green" },
            elements: [
              { tag: "div", text: { tag: "lark_md", content: `**To:** ${body.email}\n**Subject:** ${subject}` } },
              { tag: "hr" },
              { tag: "div", text: { tag: "lark_md", content: emailHtml.slice(0, 2000) } },
              {
                tag: "action",
                actions: [
                  {
                    tag: "button",
                    text: { tag: "plain_text", content: "✉️ Reply via Gmail" },
                    type: "primary",
                    multi_url: { url: `mailto:${body.email}?subject=${encodeURIComponent(subject)}` },
                  },
                ],
              },
            ],
          }),
        }),
      });
    }

    return new Response(JSON.stringify({ success: true, subject, emailHtml }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Send-Quote] Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
