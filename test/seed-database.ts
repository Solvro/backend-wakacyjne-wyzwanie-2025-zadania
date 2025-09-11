import { PrismaClient, Role, Sex } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function seedDatabase() {
  await prisma.expense.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.user.deleteMany();

  const salt = 10;
  const password = "password";
  const hashedPassword = await hash(password, salt);

  await prisma.user.createMany({
    data: [
      {
        email: "ala.makota@example.com",
        name: "Ala Makota",
        password: hashedPassword,
        role: Role.ADMIN,
        isEnabled: true,
      },
      {
        email: "barka@gmail.com",
        name: "Jan Paweł",
        password: hashedPassword,
        role: Role.COORDINATOR,
        isEnabled: true,
      },
    ],
    skipDuplicates: true,
  });

  const [user1, user2] = await prisma.user.findMany();
  await prisma.participant.createMany({
    data: [
      {
        firstName: "Ala",
        lastName: "Makota",
        address: "Zielona 3",
        phoneNumber: "2137",
        email: user1.email,
        sex: Sex.FEMALE,
      },
      {
        firstName: "Jan",
        lastName: "Paweł",
        address: "Kremówkowa 2",
        email: user2.email,
        sex: Sex.MALE,
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

seedDatabase()
  .catch((error: unknown) => {
    console.error(error);
    throw new Error("Błąd w głównej funkcji");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
