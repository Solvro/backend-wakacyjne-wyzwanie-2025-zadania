/* eslint-disable no-console */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthRole, Prisma, PrismaClient, Type } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedDb() {
  try {
    // Czyszczenie bazy danych w odpowiedniej kolejności
    console.log("Czyszczenie bazy danych...");
    await prisma.expense.deleteMany();
    await prisma.$executeRaw`DELETE FROM "_TripParticipants"`;
    await prisma.trip.deleteMany();
    await prisma.participant.deleteMany();
    await prisma.user.deleteMany();

    console.log("Tworzenie użytkowników...");
    // --- USERS ---
    const user1 = await prisma.user.create({
      data: {
        email: "john@example.com",
        password: "hashedPassword123",
        role: AuthRole.ADMIN,
        name: "John Admin",
        isEnabled: true,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: "sksks@example.com",
        password: "hashedPassword123",
        role: AuthRole.USER,
        name: "SK SKS",
        isEnabled: true,
      },
    });

    console.log("Tworzenie uczestników...");
    // --- PARTICIPANTS ---
    const jan = await prisma.participant.create({
      data: {
        firstName: "Jan",
        lastName: "Kowalski",
        email: "jan@example.com",
        userEmail: user1.email,
      },
    });

    const anna = await prisma.participant.create({
      data: {
        firstName: "Anna",
        lastName: "Kowalska",
        email: "anna@example.com",
        userEmail: user2.email,
      },
    });

    console.log("Tworzenie wycieczek z uczestnikami...");
    // --- TRIPS ---
    const trip1 = await prisma.trip.create({
      data: {
        name: "testowy trip",
        destination: "wroclaw",
        budget: new Prisma.Decimal("100.50"),
        startDate: new Date("2024-07-01"),
        endDate: new Date("2024-07-10"),
        coordinatorEmail: user1.email,
        participants: {
          connect: [{ id: jan.id }, { id: anna.id }],
        },
      },
    });

    const trip2 = await prisma.trip.create({
      data: {
        name: "drugi trip",
        destination: "warszawa",
        budget: new Prisma.Decimal("10000.50"),
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-10"),
        coordinatorEmail: user2.email,
        participants: {
          connect: [{ id: anna.id }],
        },
      },
    });

    console.log("Tworzenie wydatków...");
    // --- EXPENSES ---
    await prisma.expense.create({
      data: {
        description: "Lunch near Colosseum",
        cost: new Prisma.Decimal("35.50"),
        type: Type.FOOD,
        tripId: trip1.id,
        payerId: jan.id,
      },
    });

    await prisma.expense.create({
      data: {
        description: "Metro 24h ticket",
        cost: new Prisma.Decimal("7.00"),
        type: Type.TRANSPORT,
        tripId: trip1.id,
        payerId: anna.id,
      },
    });

    await prisma.expense.create({
      data: {
        description: "Hotel Warszawa",
        cost: new Prisma.Decimal("200.00"),
        type: Type.ACCOMODATION,
        tripId: trip2.id,
        payerId: anna.id,
      },
    });

    console.log("Seeding zakończony pomyślnie!");
  } catch (error) {
    console.error("Błąd podczas seedowania:", error);
    throw error;
  }
}

// Tylko jeśli uruchamiasz bezpośrednio ten plik
if (require.main === module) {
  seedDb()
    .catch((error: unknown) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
