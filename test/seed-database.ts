import { PrismaClient, TripStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedDatabase() {
  try {
    await prisma.user.upsert({
      where: { username: "alice" },
      update: {},
      create: {
        username: "alice",
        email: "alice@example.com",
        password: "$2b$10$hashedpassword1",
        role: "user",
      },
    });

    await prisma.user.upsert({
      where: { username: "bob" },
      update: {},
      create: {
        username: "bob",
        email: "bob@example.com",
        password: "$2b$10$hashedpassword2",
        role: "admin",
      },
    });

    const trip1 = await prisma.trip.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: "Weekend w górach",
        start_date: new Date("2025-09-01"),
        end_date: new Date("2025-09-03"),
        location: "Zakopane",
        status: TripStatus.planned,
      },
    });

    const trip2 = await prisma.trip.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: "Wakacje nad morzem",
        start_date: new Date("2025-07-15"),
        end_date: new Date("2025-07-22"),
        location: "Gdańsk",
        status: TripStatus.active,
      },
    });

    await prisma.participant.upsert({
      where: { email: "anna.kowalska@example.com" },
      update: {},
      create: {
        trip_id: trip1.id,
        name: "Anna",
        surname: "Kowalska",
        email: "anna.kowalska@example.com",
      },
    });

    await prisma.participant.upsert({
      where: { email: "jan.nowak@example.com" },
      update: {},
      create: {
        trip_id: trip1.id,
        name: "Jan",
        surname: "Nowak",
        email: "jan.nowak@example.com",
      },
    });

    await prisma.participant.upsert({
      where: { email: "maria.wisniewska@example.com" },
      update: {},
      create: {
        trip_id: trip2.id,
        name: "Maria",
        surname: "Wiśniewska",
        email: "maria.wisniewska@example.com",
      },
    });

    await prisma.expense.upsert({
      where: { id: 1 },
      update: {},
      create: {
        trip_id: trip1.id,
        amount: 500,
        description: "Hotel",
        date: new Date("2025-09-01"),
      },
    });

    await prisma.expense.upsert({
      where: { id: 2 },
      update: {},
      create: {
        trip_id: trip1.id,
        amount: 200,
        description: "Jedzenie",
        date: new Date("2025-09-02"),
      },
    });

    await prisma.expense.upsert({
      where: { id: 3 },
      update: {},
      create: {
        trip_id: trip2.id,
        amount: 800,
        description: "Apartament",
        date: new Date("2025-07-15"),
      },
    });
  } catch (error) {
    console.error("Error seeding test database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
