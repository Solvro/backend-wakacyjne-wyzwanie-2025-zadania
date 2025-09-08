import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Testowa wycieczka",
    },
  });

  await prisma.expense.create({
    data: {
      amount: 123.45,
      tripId: trip.id,
      category: "FOOD",
    },
  });

  await prisma.participant.create({
    data: {
      name: "Jan Kowalski",
      amountToPay: 500,
      tripId: trip.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    throw error;
  });
