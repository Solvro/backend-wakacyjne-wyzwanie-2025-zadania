import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Testowa wycieczka",
      start: new Date("2024-03-26"),
      end: new Date("2025-03-26"),
    },
  });

  const participant = await prisma.participant.create({
    data: {
      name: "Szymon",
      surname: "Stępień",
      age: 30,
      email: "szymon.stepien@example.com",
    },
  });

  const tripParticipant = await prisma.tripParticipant.create({
    data: {
      tripId: trip.id,
      participantId: participant.id,
      joinedAt: new Date("2025-03-26"),
    },
  });

  await prisma.expense.create({
    data: {
      amount: 1111.11,
      tripParticipantId: tripParticipant.id,
    },
  });

  console.warn("bazka zseedowana");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
