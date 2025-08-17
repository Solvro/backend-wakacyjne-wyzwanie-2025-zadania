import { ExpenseCategory, PrismaClient, TripStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a sample trip
  const trip = await prisma.trip.create({
    data: {
      name: "Wakacje w Hiszpanii",
      description:
        "Wspaniały tygodniowy pobyt na Costa del Sol z wizytą w Madrycie",
      status: TripStatus.PLANNED,
      startDate: new Date("2025-07-15"),
      endDate: new Date("2025-07-22"),
      budget: 5000,
    },
  });

  // Create sample participants
  const organizer = await prisma.participant.create({
    data: {
      name: "Anna Kowalska",
      email: "anna.kowalska@example.com",
      phone: "+48 123 456 789",
      isOrganizer: true,
      tripId: trip.id,
    },
  });

  const participant1 = await prisma.participant.create({
    data: {
      name: "Jan Nowak",
      email: "jan.nowak@example.com",
      phone: "+48 987 654 321",
      isOrganizer: false,
      tripId: trip.id,
    },
  });

  const participant2 = await prisma.participant.create({
    data: {
      name: "Maria Wiśniewska",
      email: "maria.wisniewska@example.com",
      phone: "+48 555 666 777",
      isOrganizer: false,
      tripId: trip.id,
    },
  });

  // Create sample expenses
  await prisma.expense.create({
    data: {
      title: "Bilety lotnicze",
      description: "Loty Warszawa - Malaga - Warszawa",
      amount: 1200,
      category: ExpenseCategory.TRANSPORT,
      date: new Date("2025-07-15"),
      tripId: trip.id,
      participantId: organizer.id,
    },
  });

  await prisma.expense.create({
    data: {
      title: "Rezerwacja hotelu",
      description: "Hotel 4* na 7 nocy ze śniadaniem",
      amount: 2100,
      category: ExpenseCategory.ACCOMMODATION,
      date: new Date("2025-07-16"),
      tripId: trip.id,
      participantId: organizer.id,
    },
  });

  await prisma.expense.create({
    data: {
      title: "Kolacja w restauracji",
      description: "Tradycyjna hiszpańska kolacja dla 3 osób",
      amount: 180,
      category: ExpenseCategory.FOOD,
      date: new Date("2025-07-17"),
      tripId: trip.id,
      participantId: participant1.id,
    },
  });

  await prisma.expense.create({
    data: {
      title: "Wycieczka do Muzeum Prado",
      description: "Bilety wstępu i przewodnik",
      amount: 150,
      category: ExpenseCategory.ENTERTAINMENT,
      date: new Date("2025-07-18"),
      tripId: trip.id,
      participantId: participant2.id,
    },
  });

  await prisma.expense.create({
    data: {
      title: "Ubezpieczenie podróżne",
      description: "Ubezpieczenie dla 3 osób na tydzień",
      amount: 90,
      category: ExpenseCategory.OTHER,
      date: new Date("2025-07-10"),
      tripId: trip.id,
      participantId: organizer.id,
    },
  });

  // Create additional trip for variety
  const trip2 = await prisma.trip.create({
    data: {
      name: "Weekend w Krakowie",
      description: "Krótki wypad do historycznego Krakowa",
      status: TripStatus.COMPLETED,
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-03"),
      budget: 800,
    },
  });

  const participant3 = await prisma.participant.create({
    data: {
      name: "Piotr Zieliński",
      email: "piotr.zielinski@example.com",
      phone: "+48 111 222 333",
      isOrganizer: true,
      tripId: trip2.id,
    },
  });

  await prisma.expense.create({
    data: {
      title: "Nocleg w hotelu",
      description: "Hotel w centrum Krakowa na 2 noce",
      amount: 400,
      category: ExpenseCategory.ACCOMMODATION,
      date: new Date("2025-06-01"),
      tripId: trip2.id,
      participantId: participant3.id,
    },
  });
}

main()
  .catch((error: unknown) => {
    console.error("Error during seeding:", error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
