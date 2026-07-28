import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Ensure SQLite database path works in Vercel Serverless environment
if (process.env.VERCEL) {
  const tmpDbPath = "/tmp/dev.db";
  const sourceDbPath = path.join(process.cwd(), "prisma", "dev.db");

  if (!fs.existsSync(tmpDbPath) && fs.existsSync(sourceDbPath)) {
    try {
      fs.copyFileSync(sourceDbPath, tmpDbPath);
    } catch (e) {
      console.error("Error copying DB to /tmp:", e);
    }
  }

  process.env.DATABASE_URL = `file:${tmpDbPath}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

let isDbInitialized = false;

export async function ensureDbInitialized() {
  if (isDbInitialized) return;
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Feedback" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "reason" TEXT NOT NULL,
        "rating" INTEGER NOT NULL,
        "message" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Admin" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'ADMIN',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    isDbInitialized = true;
  } catch (err) {
    console.error("Database Auto-Initialization Warning:", err);
  }
}
