import { Prisma, PrismaClient, Type } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "testowy trip",
      destination: "wroclaw",
      budget: 100.5,
      startDate: new Date("2024-07-01"),
      endDate: new Date("2024-07-10"),
    },
  });

  const jan = await prisma.participant.create({
    data: {
      firstName: "Jan",
      lastName: "Kowalski",
      email: "jan@example.com",
    },
  });

  const anna = await prisma.participant.create({
    data: {
      firstName: "Anna",
      lastName: "Kowalska",
      email: "anna@example.com",
    },
  });

  await prisma.tripParticipant.upsert({
    where: { tripId_participantId: { tripId: trip.id, participantId: jan.id } },
    update: {},
    create: { tripId: trip.id, participantId: jan.id },
  });

  await prisma.tripParticipant.upsert({
    where: {
      tripId_participantId: { tripId: trip.id, participantId: anna.id },
    },
    update: {},
    create: { tripId: trip.id, participantId: anna.id },
  });

  // 4) Expense (powiązany z Tripem; enum Type zgodny z Twoim schematem)
  await prisma.expense.create({
    data: {
      description: "Lunch near Colosseum",
      cost: new Prisma.Decimal("35.50"),
      type: Type.FOOD, // inne: TRANSPORT, ACCOMODATION, PARKING, OTHER
      tripId: trip.id,
    },
  });

  // dodatkowy przykładowy wydatek:
  await prisma.expense.create({
    data: {
      description: "Metro 24h ticket",
      cost: new Prisma.Decimal("7.00"),
      type: Type.TRANSPORT,
      tripId: trip.id,
    },
  });
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
