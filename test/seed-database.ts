import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedDatabase() {
  const bc = await bcrypt.hash("password", 10);

  await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice Johnson",
      password: bc,
      is_enabled: true,
      role: "USER",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Bob Admin",
      password: bc,
      is_enabled: true,
      role: "ADMIN",
    },
  });
  await prisma.user.upsert({
    where: { email: "superuser@example.com" },
    update: {},
    create: {
      email: "superuser@example.com",
      name: "superuser",
      password: bc,
      is_enabled: true,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "tripcord@example.com" },
    update: {},
    create: {
      email: "tripcord@example.com",
      name: "Charlie Tripcord",
      password: bc,
      is_enabled: true,
      role: "TRIPCORD",
    },
  });
  await prisma.user.upsert({
    where: { email: "addon@example.com" },
    update: {},
    create: {
      email: "addon@example.com",
      name: "Charlie addon",
      password: bc,
      is_enabled: true,
      role: "USER",
    },
  });
  await prisma.trip.upsert({
    where: { id: 1 },
    update: {},
    create: {
      destination: "Barcelona",
      description: "Team building trip to sunny Spain",
      start_date: new Date("2024-04-10T09:00:00Z"),
      end_date: new Date("2024-04-17T18:00:00Z"),
    },
  });
  await prisma.trip.upsert({
    where: { id: 2 },
    update: {},
    create: {
      destination: "Tokyo",
      description: "Exploring Japan during cherry blossom season",
      start_date: new Date("2024-03-25T08:00:00Z"),
      end_date: new Date("2024-04-05T20:00:00Z"),
    },
  });
  await prisma.trip.upsert({
    where: { id: 3 },
    update: {},
    create: {
      destination: "New York",
      description: "Business summit and sightseeing",
      start_date: new Date("2024-05-15T10:00:00Z"),
      end_date: new Date("2024-05-20T17:00:00Z"),
    },
  });
  await prisma.trip.upsert({
    where: { id: 4 },
    update: {},
    create: {
      destination: "Wrocław",
      description: "Piękny jak wrocław",
      start_date: new Date("2024-05-15T10:00:00Z"),
      end_date: new Date("2024-05-20T17:00:00Z"),
    },
  });

  await prisma.participant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Eve Smith",
      email: "alice@example.com",
      trip_id: 3,
    },
  });
  await prisma.participant.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "ads Saul",
      email: "admin@example.com",
      trip_id: 3,
    },
  });
  await prisma.participant.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "testig",
      email: "tripcord@example.com",
      trip_id: 3,
    },
  });
  await prisma.participant.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "addon",
      email: "addon@example.com",
      trip_id: 3,
    },
  });

  await prisma.expense.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Conference Hotel",
      description: "Accommodation for business summit",
      value: 1250.75,
      trip_id: 1,
    },
  });
  await prisma.expense.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Food",
      description: "safasd",
      value: 1250.75,
      trip_id: 1,
    },
  });
  await prisma.expense.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Dawg",
      description: "what da dog do?",
      value: 120.75,
      trip_id: 3,
    },
  });
}
