import "dotenv/config";

import {
  ExpenseCategory,
  ParticipantRole,
  Prisma,
  PrismaClient,
  TripStatus,
} from "../../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Gory",
      description: "Wyjazd w Tatry",
      status: TripStatus.PLANNED,
      startDate: new Date("2025-08-26T10:00:00Z"),
      endDate: new Date("2025-08-30T18:00:00Z"),
      budget: new Prisma.Decimal("1700.00"),
    },
  });

  const janusz = await prisma.participant.create({
    data: {
      tripId: trip.id,
      name: "Janusz Motyka",
      role: ParticipantRole.ORGANIZER,
      share: new Prisma.Decimal("600.00"),
    },
  });

  await prisma.participant.create({
    data: {
      tripId: trip.id,
      name: "Grażyna Skoczek",
      role: ParticipantRole.MEMBER,
      share: new Prisma.Decimal("800.00"),
    },
  });

  await prisma.expense.create({
    data: {
      payerId: janusz.id,
      amount: new Prisma.Decimal("190.00"),
      category: ExpenseCategory.FOOD,
      currency: "PLN",
      paid_at: new Date(),
    },
  });

  await prisma.expense.create({
    data: {
      payerId: janusz.id,
      amount: new Prisma.Decimal("210.00"),
      category: ExpenseCategory.TRANSPORT,
      currency: "PLN",
      paid_at: new Date(),
    },
  });
}

main()
  .catch((error) => {
    console.error("didnt work, reason:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
