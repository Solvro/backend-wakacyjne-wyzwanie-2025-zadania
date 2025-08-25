import {
  ExpenseCategory,
  ParticipantRole,
  ParticipantSex,
  PrismaClient,
  TripCategory,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.expense.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.participant.deleteMany();

  const createdParticipants = await Promise.all([
    prisma.participant.create({
      data: {
        role: ParticipantRole.ORGANIZER,
        name: "Jan",
        surname: "Kowalski",
        nick: "janko",
        email: "jan.kowalski@imejl.pl",
        phone: "+48 123 456 789",
        address: "ul. Wrocławska 1, 00-001 Wrocław",
        iban: "12 3456 7890 1234 5678 9012 3456",
        isAdult: true,
        dateOfBirth: new Date("2000-01-01"),
        placeOfBirth: "Wrocław",
        sex: ParticipantSex.MALE,
      },
    }),

    prisma.participant.create({
      data: {
        role: ParticipantRole.PARTICIPANT,
        name: "Anna",
        surname: "Nowak",
        email: "anna.nowak@imejl.pl",
        phone: "+48 987 654 321",
        address: "ul. Krakowska 2137, 69-420 Kraków",
        iban: "98 7654 3210 9876 5432 1098 7654",
        isAdult: true,
        dateOfBirth: new Date("1999-12-31"),
        sex: ParticipantSex.FEMALE,
        placeOfBirth: "Kraków",
      },
    }),

    prisma.participant.create({
      data: {
        role: ParticipantRole.PARTICIPANT,
        name: "Paweł",
        surname: "Jumper",
        nick: "pan paweł",
        email: "panpawel@imejl.pl",
        address: "ul. Ulicowa 6, 66-666 Miastowo",
        isAdult: true,
        dateOfBirth: new Date("2004-02-29"),
        placeOfBirth: "Urodzinów",
        sex: ParticipantSex.MALE,
        note: "student bez budżetu",
      },
    }),
  ]);

  const createdTrips = await Promise.all([
    prisma.trip.create({
      data: {
        category: TripCategory.VACATION,
        title: "Wakacje w Hiszpanii",
        destination: "Barcelona, Hiszpania",
        startDate: new Date("2025-07-15T08:00:00Z"),
        endDate: new Date("2025-07-22T20:00:00Z"),
        departure: "Lotnisko Chopina, Warszawa",
        accommodation: "Lotnisko El Prat, Barcelona",
        travelTime: 165,
        travelDistance: 1348.5,
        participants: {
          connect: [
            { id: createdParticipants[0].id },
            { id: createdParticipants[1].id },
            { id: createdParticipants[2].id },
          ],
        },
      },
    }),

    prisma.trip.create({
      data: {
        category: TripCategory.BUSINESS,
        title: "Konferencja IT w Berlinie",
        destination: "Berlin, Niemcy",
        startDate: new Date("2025-09-10T06:00:00Z"),
        endDate: new Date("2025-09-12T22:00:00Z"),
        departure: "Dworzec Centralny, Warszawa",
        accommodation: "Hauptbahnhof, Berlin",
        participants: {
          connect: [
            { id: createdParticipants[0].id },
            { id: createdParticipants[1].id },
          ],
        },
      },
    }),

    prisma.trip.create({
      data: {
        category: TripCategory.PERSONAL,
        title: "Weekend w Zakopanem",
        destination: "Zakopane, Polska",
        startDate: new Date("2025-06-01T16:00:00Z"),
        endDate: new Date("2025-06-03T18:00:00Z"),
        travelTime: 120,
        travelDistance: 102.3,
        participants: {
          connect: [{ id: createdParticipants[2].id }],
        },
      },
    }),
  ]);

  await Promise.all([
    prisma.expense.create({
      data: {
        category: ExpenseCategory.ACCOMMODATION,
        title: "Hotel w Barcelonie",
        recipientName: "booking.com",
        currency: "EUR",
        quantity: 3,
        amount: 798.5,
        note: "obiady wliczone",
        participantId: createdParticipants[0].id,
        tripId: createdTrips[0].id,
      },
    }),

    prisma.expense.create({
      data: {
        category: ExpenseCategory.TRANSPORT,
        title: "Bilety lotnicze do Barcelony",
        recipientName: "Ryanair",
        quantity: 3,
        currency: "PLN",
        amount: 1156.8,
        budgetLeft: 343.2,
        note: "lot w obie strony",
        participantId: createdParticipants[1].id,
        tripId: createdTrips[0].id,
      },
    }),

    prisma.expense.create({
      data: {
        category: ExpenseCategory.ACCOMMODATION,
        title: "Hotel businessowy Berlin",
        recipientName: "hotel-berlin.de",
        currency: "EUR",
        amount: 285,
        note: "hotel blisko centrum konferencyjnego",
        participantId: createdParticipants[0].id,
        tripId: createdTrips[1].id,
      },
    }),

    prisma.expense.create({
      data: {
        category: ExpenseCategory.TRANSPORT,
        title: "Bilety kolejowe Warszawa-Berlin",
        recipientName: "PKP Intercity",
        currency: "PLN",
        amount: 376,
        note: "bilety w obie strony, 1 klasa",
        participantId: createdParticipants[1].id,
        tripId: createdTrips[1].id,
      },
    }),

    prisma.expense.create({
      data: {
        category: ExpenseCategory.ACCOMMODATION,
        title: "Pensjonat pod Giewontem",
        currency: "PLN",
        amount: 300,
        participantId: createdParticipants[2].id,
        tripId: createdTrips[2].id,
      },
    }),
  ]);
}

main()
  .catch((error: unknown) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
