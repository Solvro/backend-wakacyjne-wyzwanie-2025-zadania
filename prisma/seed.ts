import "dotenv/config";

import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Kajaki i namioty",
      description: "Wyjazd na spływ kajakowy z noclegami w namiotach.",
      status: "planned",
      startDate: new Date("2025-08-25T10:00:00Z"),
      endDate: new Date("2025-08-30T18:00:00Z"),
      budget: 2500.0,
    },
  });

  const participant = await prisma.participant.create({
    data: {
      tripId: trip.id,
      name: "Janusz Pawlacz",
      role: "organizer",
      share: 500.0,
    },
  });

  await prisma.participant.create({
    data: {
      tripId: trip.id,
      name: "Grażyna Pawlacz",
      role: "member",
      share: 500.0,
    },
  });

  await prisma.expense.create({
    data: {
      tripId: trip.id,
      payerId: participant.id,
      amount: 120.0,
      category: "food",
      currency: "PLN",
      paid_at: new Date(),
    },
  });
  await prisma.expense.create({
    data: {
      tripId: trip.id,
      payerId: participant.id,
      amount: 80.0,
      category: "transport",
      currency: "PLN",
      paid_at: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error("didnt work, reason:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
