import "dotenv/config";

import {
  ExpenseCategory,
  ParticipantRole,
  PrismaClient,
  TripStatus,
} from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Kajaki i namioty",
      description: "Wyjazd na spływ kajakowy z noclegami w namiotach.",
      status: TripStatus.planned,
      startDate: new Date("2025-08-25T10:00:00Z"),
      endDate: new Date("2025-08-30T18:00:00Z"),
      budget: 2500.0,
    },
  });

  const janusz = await prisma.participant.create({
    data: {
      tripId: trip.id,
      name: "Janusz Pawlacz",
      role: ParticipantRole.organizer,
      share: 500.0,
    },
  });

  await prisma.participant.create({
    data: {
      tripId: trip.id,
      name: "Grażyna Pawlacz",
      role: ParticipantRole.member,
      share: 500.0,
    },
  });

  await prisma.expense.create({
    data: {
      tripId: trip.id,
      payerId: janusz.id,
      amount: 120.0,
      category: ExpenseCategory.food,
      currency: "PLN",
      paid_at: new Date(),
    },
  });

  await prisma.expense.create({
    data: {
      tripId: trip.id,
      payerId: janusz.id,
      amount: 80.0,
      category: ExpenseCategory.transport,
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
