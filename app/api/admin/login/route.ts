import { NextResponse } from "next/server";
import { prisma, ensureDbInitialized } from "@/lib/prisma";
import { comparePassword, createAdminSession, hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await ensureDbInitialized();

    const normalizedEmail = email.trim().toLowerCase();

    let admin = await prisma.admin.findUnique({
      where: { email: normalizedEmail },
    });

    // Auto-seed default admin if database is empty on serverless environment
    if (!admin && normalizedEmail === "admin@feedback.com") {
      const hashedPassword = await hashPassword("AdminPass123!");
      admin = await prisma.admin.create({
        data: {
          name: "System Admin",
          email: "admin@feedback.com",
          password: hashedPassword,
          role: "ADMIN",
        },
      });
    }

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await comparePassword(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createAdminSession(admin.id);

    return NextResponse.json({
      success: true,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (err: any) {
    console.error("Admin Login API Error:", err);
    return NextResponse.json({ error: err?.message || "Server login error" }, { status: 500 });
  }
}
