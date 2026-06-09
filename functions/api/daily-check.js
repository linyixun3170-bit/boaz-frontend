// ⏰ Daily 8AM Check — Pending Leads → AI Draft → Notify
// Called by cron: curl https://boaz-clothes.com/api/daily-check

const BITABLE_APP_TOKEN = "GySHbb1LJa4XTaso87BcGKKWncb";
const BITABLE_TABLE_ID = "tblAFoXji5JLlEvM";

const FIELDS = {
  name: "姓名", company: "公司", email: "邮箱",
  phone: "电话", inquiryType: "需求类型", quantity: "数量",
  message: "留言", status: "报价状态", notes: "备注",
};

const STATUS_PENDING = "opt4HLiOhG";
const STATUS_QUOTED = "optXFWIbst";

export async function onRequest(context) {
  const { env } = context;

  if (!env.FEISHU_APP_ID || !env.FEISHU_APP_SECRET) {
    return new Response(JSON.stringify({ error: "Feishu credentials not configured" }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Get token
    const authRes = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app_id: env.FEISHU_APP_ID, app_secret: env.FEISHU_APP_SECRET }),
    });
    const { tenant_access_token: token } = await authRes.json();

    // Get pending records
    const recordsRes = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${BITABLE_TABLE_ID}/records?page_size=50`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const recordsData = await recordsRes.json();
    const allRecords = recordsData.data?.items || [];

    // Filter: only 待报价
    const pending = allRecords.filter(r =>
      r.fields[FIELDS.status] === STATUS_PENDING ||
      (Array.isArray(r.fields[FIELDS.status]) && r.fields[FIELDS.status].includes(STATUS_PENDING))
    );

    const openId = env.FEISHU_USER_OPEN_ID || "ou_beec7c4f13589d61fbf39ca28d61cf39";
    let summary = "";

    if (pending.length === 0) {
      summary = "✅ 今日无新待报价客户。一切正常！";
    } else {
      const listItems = pending.map((r, i) => {
        const name = r.fields[FIELDS.name] || "?";
        const email = r.fields[FIELDS.email] || "?";
        const company = r.fields[FIELDS.company] || "";
        const qty = r.fields[FIELDS.quantity] || "";
        return `${i + 1}. **${name}**${company ? ` (${company})` : ""} — ${email}${qty ? ` — ${qty} pcs` : ""}`;
      });
      summary = `📋 发现 **${pending.length}** 个待报价客户：\n\n${listItems.join("\n")}\n\n请在飞书表格中处理：https://my.feishu.cn/base/GySHbb1LJa4XTaso87BcGKKWncb`;
    }

    // Send notification
    await fetch("https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        receive_id: openId,
        msg_type: "interactive",
        content: JSON.stringify({
          config: { wide_screen_mode: true },
          header: { title: { tag: "plain_text", content: "☀️ 每日报价检查报告" }, template: pending.length > 0 ? "orange" : "green" },
          elements: [
            { tag: "div", text: { tag: "lark_md", content: summary } },
            ...(pending.length > 0 ? [{
              tag: "action",
              actions: [{
                tag: "button",
                text: { tag: "plain_text", content: "📊 打开报价表格" },
                type: "primary",
                multi_url: { url: "https://my.feishu.cn/base/GySHbb1LJa4XTaso87BcGKKWncb" },
              }],
            }] : []),
          ],
        }),
      }),
    });

    return new Response(JSON.stringify({ total: allRecords.length, pending: pending.length }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Daily-Check] Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
}
