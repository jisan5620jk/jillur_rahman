// test-smtp-debug.js
require("dotenv").config();
const nodemailer = require("nodemailer");

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    console.log("Verifying transporter...");
    await transporter.verify();
    console.log("Transporter verified OK. Sending test mail...");

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: "Portfolio SMTP test",
      text: "This is a test sent from your Next.js portfolio.",
    });

    console.log("Send OK", info);
  } catch (err) {
    console.error("SMTP test error (full):", err);
    if (err && err.response) console.error("err.response:", err.response);
    process.exit(1);
  }
})();
