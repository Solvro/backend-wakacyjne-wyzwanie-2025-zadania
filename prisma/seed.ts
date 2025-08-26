//import { PrismaClient } from '../generated/prisma';
import { Gender, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Rozpoczynam seeding...");

  const trp = await prisma.trip.create({
    data: {
      startDate: new Date("2025-08-01T12:00:00Z"),
      endDate: new Date("2025-08-10T12:00:00Z"),
      location: "Mazury",
    },
  });

  const part = await prisma.participant.create({
    data: {
      name: "Jan",
      surname: "Kowalski",
      age: 25,
      gender: Gender.M,
      tripId: trp.id,
    },
  });

  const exp = await prisma.expense.create({
    data: {
      dailyPrice: 150.3,
      tripId: trp.id,
      discount: true,
    },
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
