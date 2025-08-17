import {
  ExpenseCategory,
  PrismaClient,
  TripStatus,
  TripType,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    // Tworzenie uczestnika
    const participant1 = await prisma.participant.create({
      data: {
        name: "Jan",
        surname: "Kowalski",
        age: 28,
        phone_num: "+48123456789",
        email: "jan.kowalski@example.com",
      },
    });

    // Tworzenie wycieczki
    const trip1 = await prisma.trip.create({
      data: {
        destination: "Kraków",
        type: TripType.CITY_BREAK,
        start_date: new Date("2024-09-15"),
        end_date: new Date("2024-09-18"),
      },
    });

    // Tworzenie wydatku
    const expense1 = await prisma.expense.create({
      data: {
        tripID: trip1.idT,
        amount: 300,
        category: ExpenseCategory.ACCOMMODATION,
      },
    });

    // Tworzenie relacji uczestnik-wycieczka
    await prisma.tripParticipant.create({
      data: {
        tripID: trip1.idT,
        parID: participant1.idP,
        status: TripStatus.CONFIRMED,
      },
    });

    // Tworzenie relacji uczestnik-wydatek
    await prisma.expenseParticipant.create({
      data: {
        expenseID: expense1.idE,
        parID: participant1.idP,
        paid: 300,
      },
    });
  } catch (error: unknown) {
    console.error("Error during seeding:", error);
    throw new Error("Seeding failed");
  }
}

main()
  .catch((error: unknown) => {
    console.error("Seeding failed:", error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.warn("Database connection closed");
  });
