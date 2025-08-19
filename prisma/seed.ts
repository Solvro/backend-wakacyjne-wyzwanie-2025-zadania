import { PrismaClient, TripStatus } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.trip.upsert({
    where: { trip_id: 1 },
    update: {},
    create: {
      trip_id: 1,
      name: "Trip 1",
      start: new Date("2025-08-18"),
      end: new Date("2025-08-25"),
      status: TripStatus.PLANNED,
    },
  });

  await prisma.participant.upsert({
    where: { participant_id: 1 },
    update: {},
    create: {
      participant_id: 1,
      name: "User 1",
      email: "user1@example.com",
    },
  });

  await prisma.trip_participant.upsert({
    where: { trip_id_participant_id: { trip_id: 1, participant_id: 1 } },
    update: {},
    create: {
      trip_id: 1,
      participant_id: 1,
    },
  });

  await prisma.expense.upsert({
    where: { expense_id: 1 },
    update: {},
    create: {
      expense_id: 1,
      trip_id: 1,
      name: "seed",
      sum: 100,
    },
  });

  await prisma.participant_expense.upsert({
    where: { expense_id_participant_id: { participant_id: 1, expense_id: 1 } },
    update: {},
    create: {
      participant_id: 1,
      expense_id: 1,
      part: 100,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
