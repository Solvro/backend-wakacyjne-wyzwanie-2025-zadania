import { ExpenseCategory, PrismaClient, TripCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.expense.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.participant.deleteMany();

  const participant1 = await prisma.participant.create({
    data: {
      role: "ORGANIZER",
      name: "Jan",
      surname: "Kowalski",
      nick: "janko",
      email: "jan.kowalski@imejl.com",
      phone: "+48 123 456 789",
      address: "ul. Wrocławska 1, 00-001 Wrocław",
      bankAccount: "12 3456 7890 1234 5678 9012 3456",
      isAdult: true,
      birthDate: new Date("2000-01-01"),
      birthplace: "Wrocław",
      note: "główny organizator",
    },
  });

  const participant2 = await prisma.participant.create({
    data: {
      role: "PARTICIPANT",
      name: "Anna",
      surname: "Nowak",
      email: "anna.nowak@imejl.com",
      phone: "+48 987 654 321",
      address: "ul. Krakowska 2137, 69-420 Kraków",
      bankAccount: "98 7654 3210 9876 5432 1098 7654",
      isAdult: true,
      birthDate: new Date("1999-12-31"),
      birthplace: "Kraków",
    },
  });

  const participant3 = await prisma.participant.create({
    data: {
      name: "Paweł",
      surname: "Jumper",
      nick: "pan paweł",
      email: "panpawel@imejl.com",
      address: "ul. Ulicowa 3, 80-001 Miastowo",
      isAdult: true,
      birthDate: new Date("2005-06-15"),
      birthplace: "Urodzinów",
      note: "student, budżet ograniczony",
    },
  });

  const trip1 = await prisma.trip.create({
    data: {
      category: TripCategory.VACATION,
      title: "Wakacje w Hiszpanii",
      destination: "Barcelona, Hiszpania",
      fromDate: new Date("2025-07-15T08:00:00Z"),
      toDate: new Date("2025-07-22T20:00:00Z"),
      departure: "Lotnisko Chopina, Warszawa",
      accommodation: "Lotnisko El Prat, Barcelona",
      travelTime: 165,
      travelDistance: 1348.5,
      note: "wycieczka nad Morze Śródziemne",
      participants: {
        connect: [
          { id: participant1.id },
          { id: participant2.id },
          { id: participant3.id },
        ],
      },
    },
  });

  const trip2 = await prisma.trip.create({
    data: {
      category: TripCategory.BUSINESS,
      title: "Konferencja IT w Berlinie",
      destination: "Berlin, Niemcy",
      fromDate: new Date("2025-09-10T06:00:00Z"),
      toDate: new Date("2025-09-12T22:00:00Z"),
      departure: "Dworzec Centralny, Warszawa",
      accommodation: "Hauptbahnhof, Berlin",
      participants: {
        connect: [{ id: participant1.id }, { id: participant2.id }],
      },
    },
  });

  const trip3 = await prisma.trip.create({
    data: {
      category: TripCategory.PERSONAL,
      title: "Weekend w Zakopanem",
      destination: "Zakopane, Polska",
      fromDate: new Date("2025-06-01T16:00:00Z"),
      toDate: new Date("2025-06-03T18:00:00Z"),
      travelTime: 120,
      travelDistance: 102.3,
      participants: {
        connect: [{ id: participant3.id }],
      },
    },
  });

  await prisma.expense.create({
    data: {
      category: ExpenseCategory.ACCOMMODATION,
      title: "Hotel w Barcelonie - 7 nocy",
      recipient: "booking.com",
      currency: "EUR",
      amount: 3,
      value: 798.5,
      note: "hotel blisko plaży, śniadania wliczone",
      participantId: participant1.id,
      tripId: trip1.id,
    },
  });

  await prisma.expense.create({
    data: {
      category: ExpenseCategory.TRANSPORT,
      title: "Bilety lotnicze do Barcelony",
      recipient: "Ryanair",
      amount: 3,
      currency: "PLN",
      value: 1156.8,
      left: 343.2,
      note: "lot w obie strony",
      participantId: participant2.id,
      tripId: trip1.id,
    },
  });

  await prisma.expense.create({
    data: {
      category: ExpenseCategory.ACCOMMODATION,
      title: "Hotel businessowy Berlin",
      recipient: "hotel-berlin.de",
      currency: "EUR",
      value: 285,
      note: "hotel w centrum, blisko centrum konferencyjnego",
      participantId: participant1.id,
      tripId: trip2.id,
    },
  });

  await prisma.expense.create({
    data: {
      category: ExpenseCategory.TRANSPORT,
      title: "Bilety kolejowe Warszawa-Berlin",
      recipient: "PKP Intercity",
      currency: "PLN",
      value: 376,
      note: "bilety w obie strony, 1 klasa",
      participantId: participant2.id,
      tripId: trip2.id,
    },
  });

  await prisma.expense.create({
    data: {
      category: ExpenseCategory.ACCOMMODATION,
      title: "Pensjonat pod Giewontem",
      currency: "PLN",
      value: 300,
      participantId: participant3.id,
      tripId: trip3.id,
    },
  });
}

main()
  .catch((error: unknown) => {
    console.error("Error during seeding");
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
