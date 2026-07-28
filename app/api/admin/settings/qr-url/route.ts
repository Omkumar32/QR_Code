import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_QR_URL = "https://qr-code-beta-bice.vercel.app/feedback";

export async function GET() {
  try {
    const setting = await prisma.settings.findUnique({
      where: { key: "qr_target_url" },
    });
    return NextResponse.json({
      url: setting?.value || DEFAULT_QR_URL,
    });
  } catch (err) {
    return NextResponse.json({ url: DEFAULT_QR_URL });
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const setting = await prisma.settings.upsert({
      where: { key: "qr_target_url" },
      update: { value: url },
      create: { key: "qr_target_url", value: url },
    });

    return NextResponse.json({ success: true, url: setting.value });
  } catch (err: any) {
    console.error("Settings save error:", err);
    return NextResponse.json({ error: "Failed to save setting" }, { status: 500 });
  }
}
