import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { feedbackFormSchema } from "@/schemas/feedback";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod Validation with Indian Phone Regex
    const validationResult = feedbackFormSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || "Invalid input data";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { name, email = "", phone, reason, rating = 5, message = "Visitor Registration" } = validationResult.data;
    const finalEmail = email.trim() || "N/A";

    // 2. Duplicate Submission Check (Within 5 Minutes for same phone or email if provided)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existingSubmission = await prisma.feedback.findFirst({
      where: {
        OR: finalEmail !== "N/A" ? [{ email: finalEmail }, { phone }] : [{ phone }],
        createdAt: { gte: fiveMinutesAgo },
      },
      select: { id: true },
    });

    if (existingSubmission) {
      return NextResponse.json(
        { error: "Duplicate submission detected. Please wait 5 minutes before submitting again." },
        { status: 429 }
      );
    }

    // 3. Save to Database
    const feedback = await prisma.feedback.create({
      data: {
        name,
        email: finalEmail,
        phone,
        reason,
        rating,
        message,
      },
    });

    console.log(`📧 [Admin Alert] New Visitor Registered: ${name} (${phone}) - Purpose: ${reason}`);

    return NextResponse.json({ success: true, feedbackId: feedback.id });
  } catch (err: any) {
    console.error("Feedback Submission API Error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error submitting feedback" },
      { status: 500 }
    );
  }
}
