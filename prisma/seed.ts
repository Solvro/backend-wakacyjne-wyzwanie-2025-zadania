import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.expense.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.user.deleteMany();

  const u1 = await prisma.user.create({
    data: {
      name: "Jan Kowalski",
      email: "janko@gmail.com",
      birthday: new Date("1990-01-01"),
    },
  });

  const u2 = await prisma.user.create({
    data: {
      name: "Anna Nowak",
      email: "anka_n@gmail.com",
      birthday: new Date("1992-02-02"),
    },
  });

  const u3 = await prisma.user.create({
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
        user_id: u1.id,
      },
    }),
    prisma.participant.create({
      data: {
        trip_id: trip.id,
        user_id: u2.id,
      },
    }),
    prisma.participant.create({
      data: {
        trip_id: trip.id,
        user_id: u3.id,
      },
    }),
  ]);

  await prisma.expense.create({
    data: {
      what: "Nocleg",
      amount: 523.43,
      trip_id: trip.id,
      user_id: u1.id,
    },
  });

  await prisma.expense.create({
    data: {
      what: "Kolacja",
      description: "Rybka w restauracji",
      amount: 213.54,
      trip_id: trip.id,
      user_id: u2.id,
    },
  });

  await prisma.expense.create({
    data: {
      what: "Latarnia morska",
      description: "Bilety wjazdu",
      amount: 43.12,
      trip_id: trip.id,
      user_id: u3.id,
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
