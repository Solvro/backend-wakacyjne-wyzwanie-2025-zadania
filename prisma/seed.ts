import {
  PrismaClient,
  expense_category,
  trip_status,
  trip_type,
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
        type: trip_type.city_break,
        start_date: new Date("2024-09-15"),
        end_date: new Date("2024-09-18"),
      },
    });

    // Tworzenie wydatku
    const expense1 = await prisma.expense.create({
      data: {
        trip_id: trip1.id,
        amount: 300,
        category: expense_category.accommodation,
      },
    });

    // Tworzenie relacji uczestnik-wycieczka
    await prisma.trip_participant.create({
      data: {
        trip_id: trip1.id,
        par_id: participant1.id,
        status: trip_status.confirmed,
      },
    });

    // Tworzenie relacji uczestnik-wydatek
    await prisma.expense_participant.create({
      data: {
        expense_id: expense1.id,
        par_id: participant1.id,
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
