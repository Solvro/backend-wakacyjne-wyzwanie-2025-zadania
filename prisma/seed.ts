import { PrismaClient, Role, Transport } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      destination: "Zakopane",
      date: new Date("2025-12-20"),
      transport: Transport.BUS,
      attractions: "Wycieczka na Giewont",
      duration: 5,
    },
  });

  await prisma.participant.create({
    data: {
      name: "Jan Kowalski",
      age: 35,
      role: Role.GUIDE,
      tripId: trip.id,
    },
  });

  await prisma.expense.create({
    data: {
      cost: 1500.5,
      additional: 200,
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
