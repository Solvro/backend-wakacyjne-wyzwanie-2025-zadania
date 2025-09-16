import { AccountType, PrismaClient, Role } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function seedDatabase() {
  const trip = await prisma.trip.create({
    data: {
      name: "Test trip",
      description: "Example trip",
      begin_date: new Date(),
      end_date: new Date(),
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
      { name: "Expense1", date: new Date(), value: 11, trip_participant_id: 1 },
      { name: "Expense2", date: new Date(), value: 22, trip_participant_id: 1 },
    ],
  });
}
