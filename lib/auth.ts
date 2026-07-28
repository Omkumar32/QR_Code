import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { AdminSession } from "@/types";
import bcrypt from "bcryptjs";

const ADMIN_COOKIE = "admin_feedback_session";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionVal = cookieStore.get(ADMIN_COOKIE)?.value;
    if (!sessionVal) return null;

    const [adminId] = sessionVal.split(":");
    if (!adminId) return null;

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!admin) return null;
    return admin;
  } catch (err) {
    return null;
  }
}

export async function createAdminSession(adminId: string) {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  cookieStore.set(ADMIN_COOKIE, `${adminId}:session`, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  cookieStore.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 0,
  });
}
