import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.expense.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.trip.deleteMany();

  const _trip = await prisma.trip.create({
    data: {
      destination: "Międzyzdroje",
      description: "Wyjazd integracyjny",
      start: new Date("2025-09-22T00:00:00Z"),
      end: new Date("2025-09-24T23:59:59Z"),
    },
  });

  const _p1 = await prisma.participant.create({
    data: {
      name: "Jan Kowalski",
      email: "janek2115@gmail.com",
      birthday: new Date("1999-07-22T00:00:00Z"),
      trip_id: _trip.id,
    },
  });

  const _p2 = await prisma.participant.create({
    data: {
      name: "Anna Nowak",
      email: "anka@gmail.com",
      birthday: new Date("2003-12-03T00:00:00Z"),
      trip_id: _trip.id,
    },
  });

  const _p3 = await prisma.participant.create({
    data: {
      name: "Oskar Kowalik",
      email: "oskikowal@gmail.com",
      birthday: new Date("2001-03-15T00:00:00Z"),
      trip_id: _trip.id,
    },
  });

  await prisma.expense.create({
    data: {
      what: "Nocleg",
      amount: 519.53,
      trip_id: _trip.id,
      participant_id: _p1.id,
    },
  });

  await prisma.expense.create({
    data: {
      what: "Kolacja",
      description: "Rybka w restauracji",
      amount: 386.94,
      trip_id: _trip.id,
      participant_id: _p2.id,
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
