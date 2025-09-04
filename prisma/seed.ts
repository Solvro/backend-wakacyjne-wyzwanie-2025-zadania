import { PrismaClient, Sex } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.expense.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.participant.deleteMany();

  await prisma.participant.createMany({
    data: [
      {
        firstName: "Ala",
        lastName: "Makota",
        address: "Zielona 3",
        phoneNumber: "2137",
        sex: Sex.FEMALE,
      },
      {
        firstName: "Jan",
        lastName: "Paweł",
        address: "Kremówkowa 2",
        sex: Sex.MALE,
      },
      {
        firstName: "Jaś",
        lastName: "Melon",
        address: "Zielona 3",
        phoneNumber: "3123",
      },
    ],
  });

  const [ala, jan] = await prisma.participant.findMany();

  await prisma.trip.createMany({
    data: [
      {
        participantId: ala.participantId,
        destination: "Japonia",
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-14"),
      },
      {
        participantId: jan.participantId,
        destination: "Berlin",
        startDate: new Date("2025-08-10"),
        endDate: new Date("2025-08-15"),
      },
    ],
  });

  const [trip] = await prisma.trip.findMany();
  await prisma.expense.createMany({
    data: [
      {
        tripId: trip.tripId,
        expenseAmount: 1978,
        expenseDescription: "Hotel",
      },
      {
        tripId: trip.tripId,
        expenseAmount: 120,
        expenseDescription: "Transport",
      },
    ],
  });
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw new Error("Błąd w głównej funkcji");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
