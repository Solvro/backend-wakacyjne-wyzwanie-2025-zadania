import { ExpenseCategory, PrismaClient, TripStatus } from "@prisma/client";

// Set the DATABASE_URL if not already set
process.env.DATABASE_URL ??=
  "postgresql://user:password@localhost:5432/budzetownik?schema=public";

const prisma = new PrismaClient();

async function main() {
  // Upsert a sample trip
  const trip = await prisma.trip.upsert({
    where: {
      id: 1, // Using ID 1 for the first trip
    },
    update: {
      name: "Wakacje w Hiszpanii",
      description:
        "Wspaniały tygodniowy pobyt na Costa del Sol z wizytą w Madrycie",
      status: TripStatus.PLANNED,
      startDate: new Date("2025-07-15"),
      endDate: new Date("2025-07-22"),
      budget: 5000,
    },
    create: {
      name: "Wakacje w Hiszpanii",
      description:
        "Wspaniały tygodniowy pobyt na Costa del Sol z wizytą w Madrycie",
      status: TripStatus.PLANNED,
      startDate: new Date("2025-07-15"),
      endDate: new Date("2025-07-22"),
      budget: 5000,
    },
  });

  // Upsert sample participants
  const organizer = await prisma.participant.upsert({
    where: {
      id: 1, // Using ID 1 for the organizer
    },
    update: {
      name: "Anna Kowalska",
      email: "anna.kowalska@example.com",
      phone: "+48 123 456 789",
      isOrganizer: true,
      tripId: trip.id,
    },
    create: {
      name: "Anna Kowalska",
      email: "anna.kowalska@example.com",
      phone: "+48 123 456 789",
      isOrganizer: true,
      tripId: trip.id,
    },
  });

  const participant1 = await prisma.participant.upsert({
    where: {
      id: 2, // Using ID 2 for the first participant
    },
    update: {
      name: "Jan Nowak",
      email: "jan.nowak@example.com",
      phone: "+48 987 654 321",
      isOrganizer: false,
      tripId: trip.id,
    },
    create: {
      name: "Jan Nowak",
      email: "jan.nowak@example.com",
      phone: "+48 987 654 321",
      isOrganizer: false,
      tripId: trip.id,
    },
  });

  const participant2 = await prisma.participant.upsert({
    where: {
      id: 3, // Using ID 3 for the second participant
    },
    update: {
      name: "Maria Wiśniewska",
      email: "maria.wisniewska@example.com",
      phone: "+48 555 666 777",
      isOrganizer: false,
      tripId: trip.id,
    },
    create: {
      name: "Maria Wiśniewska",
      email: "maria.wisniewska@example.com",
      phone: "+48 555 666 777",
      isOrganizer: false,
      tripId: trip.id,
    },
  });

  // Upsert sample expenses
  const expense1 = await prisma.expense.upsert({
    where: {
      id: 1, // Using ID 1 for the first expense
    },
    update: {
      title: "Bilety lotnicze",
      description: "Loty Warszawa - Malaga - Warszawa",
      amount: 1200,
      category: ExpenseCategory.TRANSPORT,
      date: new Date("2025-07-15"),
      tripId: trip.id,
      participantId: organizer.id,
    },
    create: {
      title: "Bilety lotnicze",
      description: "Loty Warszawa - Malaga - Warszawa",
      amount: 1200,
      category: ExpenseCategory.TRANSPORT,
      date: new Date("2025-07-15"),
      tripId: trip.id,
      participantId: organizer.id,
    },
  });

  await prisma.expense.upsert({
    where: {
      id: 2, // Using ID 2 for the second expense
    },
    update: {
      title: "Rezerwacja hotelu",
      description: "Hotel 4* na 7 nocy ze śniadaniem",
      amount: 2100,
      category: ExpenseCategory.ACCOMMODATION,
      date: new Date("2025-07-16"),
      tripId: trip.id,
      participantId: organizer.id,
    },
    create: {
      title: "Rezerwacja hotelu",
      description: "Hotel 4* na 7 nocy ze śniadaniem",
      amount: 2100,
      category: ExpenseCategory.ACCOMMODATION,
      date: new Date("2025-07-16"),
      tripId: trip.id,
      participantId: organizer.id,
    },
  });

  await prisma.expense.upsert({
    where: {
      id: 3, // Using ID 3 for the third expense
    },
    update: {
      title: "Kolacja w restauracji",
      description: "Tradycyjna hiszpańska kolacja dla 3 osób",
      amount: 180,
      category: ExpenseCategory.FOOD,
      date: new Date("2025-07-17"),
      tripId: trip.id,
      participantId: participant1.id,
    },
    create: {
      title: "Kolacja w restauracji",
      description: "Tradycyjna hiszpańska kolacja dla 3 osób",
      amount: 180,
      category: ExpenseCategory.FOOD,
      date: new Date("2025-07-17"),
      tripId: trip.id,
      participantId: participant1.id,
    },
  });

  await prisma.expense.upsert({
    where: {
      id: 4, // Using ID 4 for the fourth expense
    },
    update: {
      title: "Wycieczka do Muzeum Prado",
      description: "Bilety wstępu i przewodnik",
      amount: 150,
      category: ExpenseCategory.ENTERTAINMENT,
      date: new Date("2025-07-18"),
      tripId: trip.id,
      participantId: participant2.id,
    },
    create: {
      title: "Wycieczka do Muzeum Prado",
      description: "Bilety wstępu i przewodnik",
      amount: 150,
      category: ExpenseCategory.ENTERTAINMENT,
      date: new Date("2025-07-18"),
      tripId: trip.id,
      participantId: participant2.id,
    },
  });

  await prisma.expense.upsert({
    where: {
      id: 5, // Using ID 5 for the fifth expense
    },
    update: {
      title: "Ubezpieczenie podróżne",
      description: "Ubezpieczenie dla 3 osób na tydzień",
      amount: 90,
      category: ExpenseCategory.OTHER,
      date: new Date("2025-07-10"),
      tripId: trip.id,
      participantId: organizer.id,
    },
    create: {
      title: "Ubezpieczenie podróżne",
      description: "Ubezpieczenie dla 3 osób na tydzień",
      amount: 90,
      category: ExpenseCategory.OTHER,
      date: new Date("2025-07-10"),
      tripId: trip.id,
      participantId: organizer.id,
    },
  });

  // Upsert additional trip for variety
  const trip2 = await prisma.trip.upsert({
    where: {
      id: 2,
    },
    update: {
      name: "Weekend w Krakowie",
      description: "Krótki wypad do historycznego Krakowa",
      status: TripStatus.COMPLETED,
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-03"),
      budget: 800,
    },
    create: {
      name: "Weekend w Krakowie",
      description: "Krótki wypad do historycznego Krakowa",
      status: TripStatus.COMPLETED,
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-03"),
      budget: 800,
    },
  });

  const participant3 = await prisma.participant.upsert({
    where: {
      id: 4,
    },
    update: {
      name: "Piotr Zieliński",
      email: "piotr.zielinski@example.com",
      phone: "+48 111 222 333",
      isOrganizer: true,
      tripId: trip2.id,
    },
    create: {
      name: "Piotr Zieliński",
      email: "piotr.zielinski@example.com",
      phone: "+48 111 222 333",
      isOrganizer: true,
      tripId: trip2.id,
    },
  });

  await prisma.expense.upsert({
    where: {
      id: 6, // Using ID 6 for the sixth expense
    },
    update: {
      title: "Nocleg w hotelu",
      description: "Hotel w centrum Krakowa na 2 noce",
      amount: 400,
      category: ExpenseCategory.ACCOMMODATION,
      date: new Date("2025-06-01"),
      tripId: trip2.id,
      participantId: participant3.id,
    },
    create: {
      title: "Nocleg w hotelu",
      description: "Hotel w centrum Krakowa na 2 noce",
      amount: 400,
      category: ExpenseCategory.ACCOMMODATION,
      date: new Date("2025-06-01"),
      tripId: trip2.id,
      participantId: participant3.id,
    },
  });

  await prisma.user.upsert({
    where: {
      id: 1,
    },
    create: {
      email: "admin@test.com",
      password: "$2a$12$nD/SAA0hn/9RcZ6goRfN6OPHWiqVDb3GE.fbegGK2CGE1lT6MbZHm",
      roles: "10000",
    },
    update: {
      email: "admin@test.com",
      password: "$2a$12$nD/SAA0hn/9RcZ6goRfN6OPHWiqVDb3GE.fbegGK2CGE1lT6MbZHm",
      roles: "10000",
    },
  });

  await prisma.user.upsert({
    where: {
      id: 2,
    },
    create: {
      email: "user@test.com",
      password: "$2a$12$8PVCNf63D5L2xK4Tg7lVW.Sh31e4gzlfjXdScSTomI18MWnzoyfVy",
      roles: "00001",
    },
    update: {
      email: "user@test.com",
      password: "$2a$12$8PVCNf63D5L2xK4Tg7lVW.Sh31e4gzlfjXdScSTomI18MWnzoyfVy",
      roles: "00001",
    },
  });

  await prisma.forexRate.upsert({
    where: {
      id: 1,
    },
    create: {
      currency: "EUR",
      rate: 4.5,
      fetchedAt: new Date(),
    },
    update: {
      currency: "EUR",
      rate: 4.5,
      fetchedAt: new Date(),
    },
  });

  await prisma.forexRate.upsert({
    where: {
      id: 2,
    },
    create: {
      currency: "USD",
      rate: 4.2,
      fetchedAt: new Date(),
    },
    update: {
      currency: "USD",
      rate: 4.2,
      fetchedAt: new Date(),
    },
  });

  await prisma.payment.upsert({
    where: {
      id: 1,
    },
    create: {
      title: "Zaliczka na wakacje",
      originalAmount: 1500,
      originalCurrency: "EUR",
      plnAmount: 6750,
      status: "COMPLETED",
      createdAt: new Date(),
      updatedAt: new Date(),
      expenseId: expense1.id,
      forexRateId: 1,
    },
    update: {
      title: "Zaliczka na wakacje",
      originalAmount: 1500,
      originalCurrency: "EUR",
      plnAmount: 6750,
      status: "COMPLETED",
      createdAt: new Date(),
      updatedAt: new Date(),
      expenseId: 1,
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
