import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Testowa wycieczka",
    },
  });

  await prisma.expence.create({
    data: {
      amount: 123.45,
      tripId: trip.id,
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
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
