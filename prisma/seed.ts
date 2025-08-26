import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Weekend w górach",
      start_time: new Date("2025-09-10T09:00:00"),
      end_time: new Date("2025-09-12T18:00:00"),
      status: "planned",
    },
  });

  await prisma.participant.create({
    data: {
      name: "Jan Kowalski",
      phone_number: "123456789",
      role: "organizer",
      id_trip: trip.id_trip,
    },
  });

  await prisma.participant.create({
    data: {
      name: "Anna Nowak",
      phone_number: "987654321",
      role: "member",
      id_trip: trip.id_trip,
    },
  });

  await prisma.expense.create({
    data: {
      category: "food",
      amount: 120.5,
      note: "Obiad w karczmie",
      id_trip: trip.id_trip,
    },
  });

  await prisma.expense.create({
    data: {
      category: "accomodation",
      amount: 500,
      note: "Nocleg w pensjonacie",
      id_trip: trip.id_trip,
    },
  });

  console.warn("Seeding finished.");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
