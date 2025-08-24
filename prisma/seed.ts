import { Category, PrismaClient, Role } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const participant = await prisma.participant.create({
    data: {
      first_name: "Jan",
      last_name: "Kowalski",
      email: "jan.kowalski@example.com",
    },
  });

  const trip = await prisma.trip.create({
    data: {
      name: "Weekend w górach",
      budget: 1000,
      start_date: new Date("2025-09-01"),
      end_date: new Date("2025-09-03"),
    },
  });

  const tripParticipant = await prisma.tripParticipant.create({
    data: {
      participant_id: participant.id,
      trip_id: trip.id,
      role: Role.ORGANIZER,
    },
  });

  const expense = await prisma.expense.create({
    data: {
      participant_id: participant.id,
      trip_id: trip.id,
      amount: 250,
      title: "Bilety kolejowe",
      category: Category.TRANSPORT,
    },
  });

  console.warn({ participant, trip, tripParticipant, expense });
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
