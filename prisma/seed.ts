import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Feedback System Database...");

  await prisma.feedback.deleteMany();
  await prisma.admin.deleteMany();

  const hashedPassword = await bcrypt.hash("AdminPass123!", 10);

  // 1. Admin User
  await prisma.admin.create({
    data: {
      name: "System Admin",
      email: "admin@feedback.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // 2. Sample Feedbacks with Indian Phone Numbers
  const sampleFeedbacks = [
    {
      name: "Rajesh Sharma",
      email: "rajesh.sharma@example.com",
      phone: "9876543210",
      reason: "Service",
      rating: 5,
      message: "The customer service at the front desk was polite and resolved my query promptly.",
      createdAt: new Date(Date.now() - 2 * 3600 * 1000),
    },
    {
      name: "Priya Patel",
      email: "priya.patel@example.com",
      phone: "9123456789",
      reason: "Staff Behaviour",
      rating: 4,
      message: "Staff was helpful during check-in. Very professional conduct overall.",
      createdAt: new Date(Date.now() - 12 * 3600 * 1000),
    },
    {
      name: "Amit Verma",
      email: "amit.verma@example.com",
      phone: "8899776655",
      reason: "Complaint",
      rating: 1,
      message: "Faced issues with billing invoice generation. Took over 30 minutes to get fixed.",
      createdAt: new Date(Date.now() - 24 * 3600 * 1000),
    },
    {
      name: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      phone: "7766554433",
      reason: "Product",
      rating: 5,
      message: "High quality products and great packaging. Will definitely order again!",
      createdAt: new Date(Date.now() - 48 * 3600 * 1000),
    },
    {
      name: "Vikas Kumar",
      email: "vikas.kumar@example.com",
      phone: "9988776655",
      reason: "Suggestion",
      rating: 4,
      message: "Website navigation could be slightly smoother on mobile view, but overall great.",
      createdAt: new Date(Date.now() - 72 * 3600 * 1000),
    },
  ];

  for (const item of sampleFeedbacks) {
    await prisma.feedback.create({ data: item });
  }

  console.log("✅ Seeding completed!");
  console.log("🔑 Admin Credentials: admin@feedback.com / AdminPass123!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
