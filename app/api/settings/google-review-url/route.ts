import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_GOOGLE_REVIEW_URL =
  "https://www.google.com/search?q=globalwebify&oq=globalwebify&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8Mg0IAhAuGK8BGMcBGIAEMgoIAxAAGIAEGKIEMgcIBBAAGO8FMgYIBRBFGDwyBggGEEUYPTIGCAcQRRg80gEINjEyNWowajeoAgiwAgHxBQ55tcC_XKng8QUOebXAv1yp4A&sourceid=chrome&source=chrome.ob&ie=UTF-8#lpg=cid:CgIgAQ%3D%3D,ik:CAoSHENJQUJJaENjaFhLT0tMQlJFd2daVk01Zm5CaUY%3D&lrd=0x39f4e195a816671d:0xa9ebf12893abb828,1,,,,";

export async function GET() {
  try {
    const setting = await prisma.settings.findUnique({
      where: { key: "google_review_url" },
    });
    return NextResponse.json({
      url: setting?.value || DEFAULT_GOOGLE_REVIEW_URL,
    });
  } catch (err) {
    return NextResponse.json({ url: DEFAULT_GOOGLE_REVIEW_URL });
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const setting = await prisma.settings.upsert({
      where: { key: "google_review_url" },
      update: { value: url },
      create: { key: "google_review_url", value: url },
    });

    return NextResponse.json({ success: true, url: setting.value });
  } catch (err: any) {
    console.error("Google Review URL save error:", err);
    return NextResponse.json({ error: "Failed to save setting" }, { status: 500 });
  }
}
