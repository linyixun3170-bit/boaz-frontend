// SMTP client for Cloudflare Workers/Pages Functions
// Uses connect() API for TCP/TLS sockets (global or from cloudflare:sockets)

export async function sendEmail({ to, subject, text, from = "sale@boaz-clothes.com", env }) {
  const smtpHost = env.SMTP_HOST || "smtp.larksuite.com";
  const smtpPort = parseInt(env.SMTP_PORT || "465");
  const smtpUser = env.SMTP_USER || "sale@boaz-clothes.com";
  const smtpPass = env.SMTP_PASS;

  if (!smtpPass) {
    throw new Error("SMTP_PASS not configured");
  }

  const socket = await connect({
    host: smtpHost,
    port: smtpPort,
    tls: true,
  });

  const reader = socket.readable.getReader();
  const writer = socket.writable.getWriter();
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  let lineBuffer = "";

  async function readLine() {
    while (true) {
      const idx = lineBuffer.indexOf("\n");
      if (idx >= 0) {
        const line = lineBuffer.slice(0, idx).replace(/\r$/, "");
        lineBuffer = lineBuffer.slice(idx + 1);
        return line;
      }
      const { done, value } = await reader.read();
      if (done && !lineBuffer) return null;
      if (done) {
        const last = lineBuffer.replace(/\r$/, "");
        lineBuffer = "";
        return last;
      }
      lineBuffer += dec.decode(value, { stream: true });
    }
  }

  async function send(cmd) {
    await writer.write(enc.encode(cmd + "\r\n"));
    const resp = await readLine();
    if (!resp || (resp.length >= 3 && resp[0] >= "4")) {
      throw new Error(`SMTP error after "${cmd.split(" ")[0]}": ${resp}`);
    }
    return resp;
  }

  try {
    // Read greeting
    await readLine();

    // EHLO
    const ehloResp = await send(`EHLO boaz-clothes.com`);
    // Consume any multi-line EHLO response
    while (ehloResp && ehloResp.length >= 4 && ehloResp[3] === "-") {
      const next = await readLine();
      if (!next) break;
      // If this is the last line of multi-line, stop
      if (next.length >= 4 && next[3] === " ") break;
    }

    // AUTH LOGIN
    let authResp = await send("AUTH LOGIN");
    // Server should reply with 334 base64-encoded prompt
    if (!authResp.startsWith("3")) {
      // Try base64 password directly
      authResp = await send(btoa(smtpUser));
    } else {
      // Send username (some servers ask for VXNlcm5hbWU6)
      authResp = await send(btoa(smtpUser));
    }
    // Send password
    authResp = await send(btoa(smtpPass));

    // MAIL FROM
    await send(`MAIL FROM:<${from}>`);

    // RCPT TO
    const recipients = Array.isArray(to) ? to : [to];
    for (const rcpt of recipients) {
      await send(`RCPT TO:<${rcpt}>`);
    }

    // DATA
    await send("DATA");

    // Email body
    const headers = [
      `From: ${from}`,
      `To: ${recipients.join(", ")}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 7bit",
      "",
      text,
      ".",
    ].join("\r\n");

    await writer.write(enc.encode(headers + "\r\n"));
    await readLine();

    // QUIT
    try { await send("QUIT"); } catch {}
  } finally {
    try { reader.cancel(); } catch {}
    try { writer.close(); } catch {}
    try { socket.close(); } catch {}
  }
}
