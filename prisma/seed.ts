//import { PrismaClient } from '@prisma/client'
import { Expense_Type, PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
async function main() {
  const trip1 = await prisma.trip.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Wycieczka na RODOS",
      start_date: new Date("2025-07-21"),
      end_date: new Date("2025-07-28"),
    },
  });
  const participant1 = await prisma.participant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Grzegorz",
      surname: "Brzeczyszczykiewicz",
      email: "grzesiek123@gmail.com",
      phone: "123456789",
      trip_id: trip1.id,
    },
  });
  const expense1 = await prisma.expense.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Uzupelnienie zapasu wafelkow",
      amount: 2.99,
      type: Expense_Type.food,
      trip_id: trip1.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
