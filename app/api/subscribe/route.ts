// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Valid email required." }, { status: 400 });
    }

    // TODO: replace this with provider integration (Mailchimp, Postmark, DB, etc.)
    // For now we just log to the server console for testing.
    console.log("New newsletter signup:", email);

    // Simulate async work if needed:
    // await someProvider.addSubscriber(email);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
