// app/api/contact/route.ts  (nodemailer - copy/paste)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, website } = await req.json().catch(() => ({}));

    // honeypot
    if (website) return NextResponse.json({ ok: true, bot: true }, { status: 200 });

    // simple validation
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields." }, { status: 400 });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      FROM_EMAIL,
      TO_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL || !TO_EMAIL) {
      return NextResponse.json({ ok: false, error: "SMTP env vars missing." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      tls: { rejectUnauthorized: false } // dev helper
    });

    // verify connection & credentials
    try {
      await transporter.verify();
    } catch (verifyErr: any) {
      console.error("SMTP verify error:", safeErr(verifyErr));
      return NextResponse.json({ ok: false, error: "SMTP verify failed", detail: safeErr(verifyErr) }, { status: 500 });
    }

    const mail = {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Portfolio contact — ${name} <${email}>`,
      text: `${name} <${email}>\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>`
    };

    try {
      const info = await transporter.sendMail(mail);
      console.log("SMTP send success:", info);
      return NextResponse.json({ ok: true }, { status: 200 });
    } catch (sendErr: any) {
      console.error("SMTP send error:", safeErr(sendErr));
      return NextResponse.json({ ok: false, error: "SMTP send failed", detail: safeErr(sendErr) }, { status: 500 });
    }
  } catch (err: any) {
    console.error("Unexpected API error:", safeErr(err));
    return NextResponse.json({ ok: false, error: "Internal server error", detail: safeErr(err) }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return String(str).replace(/[&<>"']/g, (s) => {
    switch (s) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      case "'": return "&#39;";
      default: return s;
    }
  });
}
function safeErr(err: any) {
  try {
    return {
      message: err?.message,
      code: err?.code,
      response: err?.response ? (err.response?.body ?? err.response) : undefined,
      stack: process.env.NODE_ENV === "development" ? (err?.stack?.split("\n").slice(0,6)) : undefined
    };
  } catch {
    return { message: String(err) };
  }
}
