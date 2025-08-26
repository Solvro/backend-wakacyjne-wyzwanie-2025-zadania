import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const trip1 = await prisma.trip.create({
    data: {
      name: "Wakacje w Grecji",
      description: "Słoneczne wakacje na Krecie",
      destination: "Grecja",
      travel_type: "PLANE",
      start_date: new Date("2025-09-01"),
      end_date: new Date("2025-09-15"),
    },
  });

  const participant1 = await prisma.participant.create({
    data: {
      name: "Jan Kowalski",
      email: "jan.kowalski@example.com",
    },
  });

  await prisma.expense.create({
    data: {
      price: 1500.5,
      trip_id: trip1.id,
      participant_id: participant1.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
