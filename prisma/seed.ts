import {
  ExpenseCategory,
  ParticipantRole,
  Prisma,
  PrismaClient,
  TripStatus,
} from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Kajaki i namioty",
      description: "Wyjazd na spływ kajakowy z noclegami w namiotach.",
      status: TripStatus.PLANNED,
      startDate: new Date("2025-08-25T10:00:00Z"),
      endDate: new Date("2025-08-30T18:00:00Z"),
      budget: new Prisma.Decimal("2500.00"),
    },
  });

  const janusz = await prisma.participant.create({
    data: {
      tripId: trip.id,
      name: "Janusz Pawlacz",
      role: ParticipantRole.ORGANIZER,
      share: new Prisma.Decimal("500.00"),
    },
  });

  await prisma.participant.create({
    data: {
      tripId: trip.id,
      name: "Grażyna Pawlacz",
      role: ParticipantRole.MEMBER,
      share: new Prisma.Decimal("500.00"),
    },
  });

  await prisma.expense.create({
    data: {
      payerId: janusz.id,
      amount: new Prisma.Decimal("120.00"),
      category: ExpenseCategory.FOOD,
      currency: "PLN",
      paidAt: new Date(),
    },
  });

  await prisma.expense.create({
    data: {
      payerId: janusz.id,
      amount: new Prisma.Decimal("80.00"),
      category: ExpenseCategory.TRANSPORT,
      currency: "PLN",
      paidAt: new Date(),
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
