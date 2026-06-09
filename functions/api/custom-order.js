// 🎨 Custom Order Submission → Feishu Bitable
// POST /api/custom-order
// Body: { designs: [{positionId, image (base64), scale, x, y}], customer: {name, email, company, phone, country, address, quantity, message} }

const BITABLE_APP_TOKEN = "GySHbb1LJa4XTaso87BcGKKWncb";
const BITABLE_TABLE_ID = "tblAFoXji5JLlEvM";

const LABELS = {
  custom: "Custom Manufacturing",
  wholesale: "Wholesale Pricing",
  sample: "Request Samples",
};

const POSITION_NAMES = {
  center: "Center Chest", left: "Left Chest", back: "Back", sleeve: "Sleeve",
};

async function getToken(env) {
  const r = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: env.FEISHU_APP_ID, app_secret: env.FEISHU_APP_SECRET }),
  });
  return (await r.json()).tenant_access_token;
}

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });

  try {
    const body = await request.json();
    const { designs, customer } = body;

    if (!customer?.name || !customer?.email) {
      return new Response(JSON.stringify({ error: "Name and email required" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const token = await getToken(env);
    const ip = request.headers.get("CF-Connecting-IP") || "";
    const countryCode = request.headers.get("CF-IPCountry") || "";

    // Build design summary text (truncate base64 for brevity)
    const activeDesigns = (designs || []).filter(d => d.image);
    const designNote = activeDesigns.map(d =>
      `[${POSITION_NAMES[d.positionId] || d.positionId}]: scale=${d.scale || 1}x, pos=(${Math.round(d.x || 50)},${Math.round(d.y || 50)})`
    ).join("\n");

    const notes = [
      `📦 Custom Order from boaz-clothes.com`,
      `Designs: ${activeDesigns.length}/${(designs || []).length} positions`,
      ``,
      designNote,
      ``,
      customer.address ? `Shipping: ${customer.country}, ${customer.address}` : `Country: ${customer.country || countryCode}`,
      `IP: ${ip}`,
      `Submitted: ${new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}`,
    ].join("\n");

    // Write to bitable
    const fields = {
      "姓名": customer.name || "",
      "公司": customer.company || "",
      "邮箱": customer.email || "",
      "电话": customer.phone || "",
      "国家/地区": customer.country || "",
      "收货地址": customer.address || "",
      "需求类型": "定制生产",
      "数量": customer.quantity || "",
      "留言": customer.message || "",
      "报价状态": "待报价",
      "备注": notes,
      "IP地址": ip,
    };

    const recordRes = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${BITABLE_TABLE_ID}/records`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fields }),
      }
    );

    if (!recordRes.ok) {
      const errText = await recordRes.text();
      console.error("[Custom-Order] Bitable write failed:", errText);
    }

    const recordData = await recordRes.json();
    const recordId = recordData.data?.record?.record_id || "";

    // Try to upload design images as bitable attachments
    for (const design of activeDesigns) {
      if (!design.image || !design.image.startsWith("data:image")) continue;

      // Convert base64 to blob and upload to Feishu drive, then link to bitable
      try {
        const base64Data = design.image.split(",")[1];
        const mimeType = design.image.split(";")[0].split(":")[1];
        const ext = mimeType.split("/")[1] || "png";
        const fileName = `design-${design.positionId}-${Date.now()}.${ext}`;

        // Step 1: Upload file to Feishu Drive
        const binaryStr = atob(base64Data);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

        const formData = new FormData();
        const fileType = mimeType === "image/png" ? "png" : "jpg";
        formData.append("file_name", fileName);
        formData.append("parent_type", "bitable_file");
        formData.append("parent_node", BITABLE_APP_TOKEN);
        formData.append("size", bytes.length.toString());
        formData.append("file", new Blob([bytes], { type: mimeType }), fileName);

        const uploadRes = await fetch("https://open.feishu.cn/open-apis/drive/v1/files/upload_all", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const uploadData = await uploadRes.json();
        console.log("[Custom-Order] Upload result:", uploadData.code, uploadData.msg);

        if (uploadData.code === 0) {
          const fileToken = uploadData.data?.file_token;
          if (fileToken) {
            // Step 2: Link file to the record's attachment field
            await fetch(
              `https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${BITABLE_TABLE_ID}/records/${recordId}/fields/效果图`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                  file_token: fileToken,
                }),
              }
            );
          }
        }
      } catch (e) {
        console.error("[Custom-Order] Failed to upload design image:", e);
      }
    }

    // Send Feishu notification card
    try {
      const openId = env.FEISHU_USER_OPEN_ID || "ou_beec7c4f13589d61fbf39ca28d61cf39";
      const designsSummary = activeDesigns.map(d =>
        `🎨 ${POSITION_NAMES[d.positionId] || d.positionId}`
      ).join(" | ") || "No design images";

      await fetch("https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          receive_id: openId,
          msg_type: "interactive",
          content: JSON.stringify({
            config: { wide_screen_mode: true },
            header: { title: { tag: "plain_text", content: "🎨 New Custom Design Order!" }, template: "indigo" },
            elements: [
              { tag: "div", text: { tag: "lark_md", content: `**${customer.name}**${customer.company ? ` (${customer.company})` : ""}\n**Email:** ${customer.email}\n**Phone:** ${customer.phone || "—"}\n**Country:** ${customer.country || countryCode}\n**Qty:** ${customer.quantity || "—"}\n**Designs:** ${designsSummary}` } },
              { tag: "hr" },
              { tag: "div", text: { tag: "lark_md", content: `**Message:**\n${customer.message || "—"}` } },
              { tag: "hr" },
              {
                tag: "action",
                actions: [
                  {
                    tag: "button", text: { tag: "plain_text", content: "📊 View in Bitable" },
                    type: "primary", multi_url: { url: "https://my.feishu.cn/base/GySHbb1LJa4XTaso87BcGKKWncb" },
                  },
                  {
                    tag: "button", text: { tag: "plain_text", content: "✉️ Reply" },
                    type: "default", multi_url: { url: `mailto:${customer.email}?subject=Re: Custom Order from ${encodeURIComponent(customer.name)}` },
                  },
                ],
              },
            ],
          }),
        }),
      });
    } catch (e) {
      console.error("[Custom-Order] Notification failed:", e);
    }

    return new Response(JSON.stringify({ success: true, recordId }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Custom-Order] Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
}
