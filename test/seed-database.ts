import { AccountType, Currency, PrismaClient, Role } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function seedDatabase() {
  const trip = await prisma.trip.create({
    data: {
      name: "Test trip",
      description: "Example trip",
      begin_date: new Date("2025-09-16"),
      end_date: new Date("2025-09-16"),
    },
  });

  const participant = await prisma.participant.create({
    data: {
      email: "abcd@example.com",
      password: await hash("test", 10),
      name: "Marek",
      surname: "Kowalski",
      account_type: AccountType.BASIC,
      role: Role.USER,
    },
  });
  await prisma.participant.create({
    data: {
      email: "abcdef@example.com",
      password: await hash("test", 10),
      name: "Marek",
      surname: "Kowalski",
      account_type: AccountType.BASIC,
      role: Role.ADMIN,
    },
  });

  await prisma.tripParticipant.create({
    data: {
      trip_id: trip.id,
      participant_id: participant.id,
    },
  });

  await prisma.expense.createMany({
    data: [
      {
        name: "Expense1",
        date: new Date(),
        value: 11,
        trip_participant_id: 1,
        currency: Currency.PLN,
      },
      {
        name: "Expense2",
        date: new Date(),
        value: 22,
        trip_participant_id: 1,
        currency: Currency.PLN,
      },
    ],
  });

  await prisma.exchangeRate.createMany({
    data: [
      {
        currency: Currency.CZK,
        exchange_rate: 0.15,
      },
      {
        currency: Currency.USD,
        exchange_rate: 3.6,
      },
      {
        currency: Currency.EUR,
        exchange_rate: 4.2,
      },
    ],
  });
}
