import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.expense.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.person.deleteMany();

  const p1 = await prisma.person.create({
    data: {
      name: "Jan Kowalski",
      email: "janko@gmail.com",
      birthday: new Date("1990-01-01"),
    },
  });

  const p2 = await prisma.person.create({
    data: {
      name: "Anna Nowak",
      email: "anka_n@gmail.com",
      birthday: new Date("1992-02-02"),
    },
  });

  const p3 = await prisma.person.create({
    data: {
      name: "Oskar Kowalik",
      email: "oskikowal2115@gmail.com",
      birthday: new Date("1994-03-03"),
    },
  });

  const trip = await prisma.trip.create({
    data: {
      destination: "Międzyzdroje",
      description: "Wyjazd integracyjny",
      start: new Date("2025-04-10"),
      end: new Date("2025-04-15"),
    },
  });

  const _participants = await Promise.all([
    prisma.participant.create({
      data: {
        trip_id: trip.id,
        person_id: p1.id,
      },
    }),
    prisma.participant.create({
      data: {
        trip_id: trip.id,
        person_id: p2.id,
      },
    }),
    prisma.participant.create({
      data: {
        trip_id: trip.id,
        person_id: p3.id,
      },
    }),
  ]);

  await prisma.expense.create({
    data: {
      what: "Nocleg",
      amount: 523.43,
      trip_id: trip.id,
      person_id: p1.id,
    },
  });

  await prisma.expense.create({
    data: {
      what: "Kolacja",
      description: "Rybka w restauracji",
      amount: 213.54,
      trip_id: trip.id,
      person_id: p2.id,
    },
  });

  await prisma.expense.create({
    data: {
      what: "Latarnia morska",
      description: "Bilety wjazdu",
      amount: 43.12,
      trip_id: trip.id,
      person_id: p3.id,
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
