/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable unicorn/prevent-abbreviations */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cleanDb() {
  // Delete in the correct order (children first, then parents)
  await prisma.expense.deleteMany();
  await prisma.$executeRaw`DELETE FROM "_TripParticipants"`;
  await prisma.trip.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.user.deleteMany();

  // Reset sekwencji auto-increment
  await prisma.$executeRaw`ALTER SEQUENCE "Trip_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Participant_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Expense_id_seq" RESTART WITH 1`;
  // await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
}
