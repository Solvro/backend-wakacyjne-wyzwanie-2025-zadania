import { Role, Sex } from "@prisma/client";
import { hash } from "bcrypt";

import type { DatabaseService } from "../src/database/database.service";

export async function seedDatabase(prisma: DatabaseService) {
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

  const user1 = await prisma.user.findFirst({
    where: { email: "ala.makota@example.com" },
  });

  const user2 = await prisma.user.findFirst({
    where: { email: "barka@gmail.com" },
  });

  if (user1 === null || user2 === null) {
    throw new Error("Users not found");
  }
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

  const ala = await prisma.participant.findFirst({
    where: { firstName: "Ala" },
  });

  const jan = await prisma.participant.findFirst({
    where: { firstName: "Jan" },
  });

  if (ala == null || jan == null) {
    console.warn(ala);
    console.warn(jan);
    throw new Error("Participants not found");
  }

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

  const trip = await prisma.trip.findFirst({
    where: { destination: "Japonia" },
  });

  if (trip === null) {
    throw new Error("Trip not found");
  }

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
