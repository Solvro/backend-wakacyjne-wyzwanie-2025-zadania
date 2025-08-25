import { PrismaClient } from "@prisma/client";
import { Prisma, Sex } from "generated/prisma";
import { last } from "rxjs";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Trip to Paris",
      description: "A wonderful trip to the city of lights",
      startDate: new Date("2023-10-01"),
      endDate: new Date("2023-10-10"),
    },
  });

  await prisma.expense.createMany({
    data: [
      {
        tripId: trip.id,
        amount: 150,
        description: "Flight tickets",
        date: new Date("2023-10-01"),
      },
      {
        tripId: trip.id,
        amount: 300,
        description: "Hotel stay",
        date: new Date("2023-10-02"),
      },
      {
        tripId: trip.id,
        amount: 50,
        description: "Museum tickets",
        date: new Date("2023-10-03"),
      },
    ],
  });

  const user = await prisma.user.create({
    data: {
      name: "Kamil",
      middleName: "Paweł",
      lastName: "Kajta",
      sex: Sex.MALE,
      email: "dghe",
    },
  });

  await prisma.participant.create({
    data: {
      userId: user.id,
      tripId: trip.id,
    },
  });
}
