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
      trip_id: trp.id,
    },
  });

  const exp = await prisma.expense.create({
    data: {
      daily_price: 150.3,
      trip_id: trp.id,
      discount: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    try {
      await prisma.$disconnect();
    } finally {
      process.exit(1);
    }
  });
