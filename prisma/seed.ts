import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  const bc = await bcrypt.hash("password", 10);
  const Trip = await prisma.trip.upsert({
    where: { id: 0 },
    update: {},
    create: {
      destination: "Trip to the mountains",
      description: "A relaxing trip to the mountains with friends.",
      start_date: new Date("2023-10-01"),
      end_date: new Date("2023-10-07"),
    },
  });
  const User = await prisma.user.upsert({
    where: { email: "KGHMPolskaMiedz@kghm.com" },
    update: {},
    create: {
      email: "KGHMPolskaMiedz@kghm.com",
      name: "John Doe",
      password: bc,
      is_enabled: true,
      role: "USER",
    },
  });

  const Admin = await prisma.user.upsert({
    where: { email: "patmikdev@gmail.com" },
    update: {},
    create: {
      email: "patmikdev@gmail.com",
      name: "Admin",
      password: bc, // bcrypt hash for "password"
      is_enabled: true,
      role: "ADMIN",
    },
  });

  const Tripcord = await prisma.user.upsert({
    where: { email: "tpc@gmail.com" },
    update: {},
    create: {
      email: "tpc@gmail.com",
      name: "Trip Cord",
      password: bc, // bcrypt hash for "password"
      is_enabled: true,
      role: "TRIPCORD",
    },
  });

  const Participant = await prisma.participant.upsert({
    where: { id: 0 },
    update: {},
    create: {
      name: "Dill Doe",
      email: User.email,
      trip_id: Trip.id,
    },
  });

  const Expense = await prisma.expense.upsert({
    where: { id: 0 },
    update: {},
    create: {
      name: "Hotel Booking",
      description: "Booking for the hotel during the trip.",
      value: 500.45,
      trip_id: Trip.id,
    },
  });
  console.warn(Expense, "Expense created successfully");
  console.warn(Trip, "Trip created successfully");
  console.warn(Participant, "Participant created successfully");
  console.warn(User, "User created successfully");
  console.warn(Admin, "Admin created successfully");
  console.warn(Tripcord, "Tripcord created successfully");
  console.warn("Seed completed successfully");
};
main().catch((error: unknown) => {
  console.warn("Error While generating Seed: \n", error);
});
