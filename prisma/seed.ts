import { PrismaClient, Role } from "@prisma/client";

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
      password: "$2b$10$IXAWBvtyftXhTkz5itSkDeRIvgOZlQP9mq4Ms9fsZTPLnum3tHAh2", // haslo_janko@gmail.com
      role: Role.ADMIN,
      birthday: new Date("1990-01-01"),
    },
  });

  const u2 = await prisma.user.create({
    data: {
      name: "Anna Nowak",
      email: "anka_n@gmail.com",
      password: "$2b$10$ebhd5QFCJWSowAaj5uTsFuwWmUX/IVAm9SdTBHTavhlpokqGFT9bG", // haslo_anka_n@gmail.com
      role: Role.USER,
      birthday: new Date("1992-02-02"),
    },
  });

  const u3 = await prisma.user.create({
    data: {
      name: "Oskar Kowalik",
      email: "oski.kowal2115@gmail.com",
      password: "$2b$10$am9oMXh99Uvw5SpVNEoUB.A0wiBzHCQWeCZAYyBX6VRlc6japFbHu", // haslo_oski.kowal2115@gmail.com
      role: Role.TRIP_COORDINATOR,
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
        user_email: u1.email,
      },
    }),
    prisma.participant.create({
      data: {
        trip_id: trip.id,
        user_email: u2.email,
      },
    }),
    prisma.participant.create({
      data: {
        trip_id: trip.id,
        user_email: u3.email,
      },
    }),
  ]);

  await prisma.expense.create({
    data: {
      what: "Nocleg",
      amount: 523.43,
      trip_id: trip.id,
      user_email: u1.email,
    },
  });

  await prisma.expense.create({
    data: {
      what: "Kolacja",
      description: "Rybka w restauracji",
      amount: 213.54,
      trip_id: trip.id,
      user_email: u2.email,
    },
  });

  await prisma.expense.create({
    data: {
      what: "Latarnia morska",
      description: "Bilety wjazdu",
      amount: 43.12,
      trip_id: trip.id,
      user_email: u3.email,
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
