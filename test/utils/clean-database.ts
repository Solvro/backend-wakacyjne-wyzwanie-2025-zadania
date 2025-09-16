import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cleanDatabase() {
  await prisma.expense.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.user.deleteMany();

  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"User"', 'email'), 1, false);`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Trip"', 'trip_id'), 1, false);`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Participant"', 'participant_id'), 1, false);`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Expense"', 'expense_id'), 1, false);`;
}
