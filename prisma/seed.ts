//import { PrismaClient } from '../generated/prisma';
import { Gender, PrismaClient, Role } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Rozpoczynam seeding...");

  const password = "password";
  const salt = 10;
  const hashedPassword = await hash(password, salt);

  const trp = await prisma.trip.create({
    data: {
      date_start: new Date("2025-08-01T12:34:56Z"),
      participant_id: 1,
      destination: "Paris",
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "emao",
      name: "Jan",
      password: hashedPassword,
      role: Role.ADMIN,
      is_enabled: true,
    },
  });

  const part = await prisma.participant.create({
    data: {
      first_name: "Jan",
      second_name: "K",
      last_name: "Kowalski",
      email: user.email,
      gender: Gender.MALE,
    },
  });

  const exp = await prisma.expense.create({
    data: {
      trip_id: 1,
      desc: "ticket",
      price: 9999.99,
    },
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
