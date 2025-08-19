/* eslint-disable no-console */
import { PrismaClient, TripStatus } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Weekend w górach",
      start_date: new Date("2025-09-01"),
      end_date: new Date("2025-09-03"),
      location: "Zakopane",
      status: TripStatus.planned,
    },
  });

  const participant = await prisma.participant.create({
    data: {
      trip_id: trip.id,
      name: "Anna",
      surname: "Kowalska",
      email: "anna.kowalska@example.com",
    },
  });

  const expense = await prisma.expense.create({
    data: {
      trip_id: trip.id,
      amount: 500,
      description: "Hotel",
      date: new Date("2025-09-01"),
    },
  });

  await prisma.expenseParticipant.create({
    data: {
      trip_id: trip.id,
      participant_id: participant.id,
      expense_id: expense.id,
      amount: 500,
    },
  });

  console.log("Baza zseedowana!");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
