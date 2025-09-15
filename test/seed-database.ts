import { PrismaClient, Role, Sex } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function seedDatabase() {
  await prisma.trip.createMany({
    data: [
      {
        title: "Trip 1",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        title: "Trip 2",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
      },
    ],
  });

  await prisma.expense.createMany({
    data: [
      {
        amount: 100,
        description: "Lunch",
        createdAt: new Date(),
        tripId: 1,
      },
      {
        amount: 200,
        description: "Taxi",
        createdAt: new Date(),
        tripId: 1,
      },
    ],
  });

  await prisma.user.create({
    data: {
      email: "email",
      name: "Kamil",
      middleName: "Paweł",
      lastName: "Kajta",
      sex: Sex.MALE,
      password: await hash("haslo", 10),
      isEnabled: true,

      role: Role.ADMIN,
    },
  });

  await prisma.participant.createMany({
    data: [
      {
        userEmail: "email",
        tripId: 1,
      },
      {
        userEmail: "email",
        tripId: 1,
      },
    ],
  });
}
