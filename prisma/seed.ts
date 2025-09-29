import { Currency, PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Testowa wycieczka",
      start: new Date("2024-03-26"),
      end: new Date("2025-03-26"),
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "szymon.stepien@example.com",
      password: "Solvro",
      role: Role.ADMIN,
    },
  });

  const participant = await prisma.participant.create({
    data: {
      name: "Szymon",
      surname: "Stępień",
      age: 30,
      email: user.email,
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

  const rates = [
    { currency: Currency.EUR, value: 4.7 },
    { currency: Currency.USD, value: 5.4 },
    { currency: Currency.SEK, value: 0.45 },
  ];

  for (const rate of rates) {
    await prisma.rate.upsert({
      where: { currency: rate.currency },
      create: { currency: rate.currency, value: rate.value },
      update: { value: rate.value },
    });
  }

  await prisma.payment.create({
    data: {
      amount: 100,
      amountPLN: 470,
      currency: Currency.EUR,
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
