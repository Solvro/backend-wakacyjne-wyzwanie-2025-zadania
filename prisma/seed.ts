import { PrismaClient, Role, Sex } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.expense.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      {
        email: "ala.makota@example.com",
        name: "Ala Makota",
        password: "$2b$12$va3nsup7yqWJP9Ae9adYE",
        role: Role.ADMIN,
        isEnabled: true,
      },
      {
        email: "barka@gmail.com",
        name: "Jan Paweł",
        password: "SgPp7g1R.R7y", //password
        role: Role.USER,
        isEnabled: true,
      },
      {
        email: "marian@gmail.com",
        name: "Jaś Melon",
        password:
          "$2b$12$va3nsup7yqWJP9Ae9adYE.CJ4GqSxa8Lr3T0Dx93tSgPp7g1R.R7y", //password
        role: Role.USER,
        isEnabled: false,
      },
    ],
  });
  await prisma.participant.createMany({
    data: [
      {
        firstName: "Ala",
        lastName: "Makota",
        address: "Zielona 3",
        phoneNumber: "2137",
        email: "ala.makota@example.com",
        sex: Sex.FEMALE,
      },
      {
        firstName: "Jan",
        lastName: "Paweł",
        address: "Kremówkowa 2",
        email: "barka@gmail.com",
        sex: Sex.MALE,
      },
      {
        firstName: "Jaś",
        lastName: "Melon",
        address: "Zielona 3",
        email: "marian@gmail.com",
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
