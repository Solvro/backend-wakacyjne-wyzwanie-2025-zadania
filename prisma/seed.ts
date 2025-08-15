import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Test Trip",
      destination: "Brazil",
      start_date: new Date(),
      end_date: new Date(),
    },
  });

  const participant = await prisma.participant.create({
    data: {
      name: "Alice",
      role: "GUIDE",
      trip_id: trip.id,
    },
  });

  await prisma.expense.create({
    data: {
      description: "Hotel",
      amount: 2500,
      currency: "PLN",
      date: new Date(),
      trip_id: trip.id,
      participant_id: participant.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🦫✅ Seed completed");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
