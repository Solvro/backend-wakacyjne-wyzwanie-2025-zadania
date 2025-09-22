import { prisma } from "../setup";

export async function truncateAll() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Expense", "Participant", "Trip", "User" RESTART IDENTITY CASCADE;
  `);
}
