import { PrismaClient } from "@prisma/client";
import { Sex } from "generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      title: "Wycieczka do Krakowa",
      description: "Zwiedzanie zabytków i degustacja lokalnej kuchni",
      startDate: new Date("2023-10-01"),
      endDate: new Date("2023-10-05"),
    },
  });

  const expense = await prisma.expense.create({
    data: {
      amount: 200,
      description: "Bilety wstępu do muzeum",
      tripId: trip.id,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Jan",
      middleName: "Nowak",
      lastName: "Kowalski",
      sex: Sex.MALE,
      email: "jankowalsi@gmail.com",
    },
  });
  const participant = await prisma.participant.create({
    data: {
      userId: user.id,
      tripId: trip.id,
    },
  });

  main()
    .catch((error: unknown) => {
      console.error(error);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
