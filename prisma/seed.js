const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("AdminPass123!", 10);

  const admin = await prisma.admin.upsert({
    where: { email: "admin@feedback.com" },
    update: {},
    create: {
      name: "System Admin",
      email: "admin@feedback.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin seeded:", admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
