import { Category, CurrencyName, PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedDatabase() {
  const trip = await prisma.trip.create({
    data: {
      name: "Wycieczka do Wrocławia",
      date_start: new Date("2025-08-13"),
      date_end: new Date("2025-08-14"),
      description: "wycieczka na politechnike",
    },
  });
  const password = "123";
  const hash = await bcrypt.hash(password, 10);
  const janusz = await prisma.participant.create({
    data: {
      name: "Janusz",
      email: "janusz@example.com",
      password: hash,
      role: Role.Admin,
      isEnabled: true,
    },
  });
  await prisma.expense.create({
    data: {
      title: "Bilet PKP",
      category: Category.Transport,
      amount: 21.37,
      currency: CurrencyName.PLN,
      date: new Date("2025-09-19"),
      trip_id: trip.trip_id,
      participant_id: janusz.participant_id,
      paid: false,
    },
  });

  await prisma.tripParticipant.create({
    data: {
      trip_id: trip.trip_id,
      participant_id: janusz.participant_id,
    },
  });
  await prisma.participant.create({
    data: {
      name: "user",
      email: "user@example.com",
      password: hash,
      role: Role.Participant,
      isEnabled: true,
    },
  });
  await prisma.participant.create({
    data: {
      name: "coordinator",
      email: "coordinator@example.com",
      password: hash,
      role: Role.Trip_Coordinator,
      isEnabled: true,
    },
  });
}
