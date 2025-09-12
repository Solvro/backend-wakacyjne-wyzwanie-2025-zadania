import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedDatabase() {
  const bc = await bcrypt.hash("password", 10);

  try {
    await prisma.user.create({
      data: {
        email: "alice@example.com",
        name: "Alice Johnson",
        password: bc,
        is_enabled: true,
        role: "USER",
      },
    });

    await prisma.user.create({
      data: {
        email: "admin@example.com",
        name: "Bob Admin",
        password: bc,
        is_enabled: true,
        role: "ADMIN",
      },
    });

    await prisma.user.create({
      data: {
        email: "tripcord@example.com",
        name: "Charlie Tripcord",
        password: bc,
        is_enabled: true,
        role: "TRIPCORD",
      },
    });
    await prisma.trip.createMany({
      data: [
        {
          destination: "Barcelona",
          description: "Team building trip to sunny Spain",
          start_date: new Date("2024-04-10T09:00:00Z"),
          end_date: new Date("2024-04-17T18:00:00Z"),
        },
        {
          destination: "Tokyo",
          description: "Exploring Japan during cherry blossom season",
          start_date: new Date("2024-03-25T08:00:00Z"),
          end_date: new Date("2024-04-05T20:00:00Z"),
        },
      ],
      skipDuplicates: true,
    });

    await prisma.trip.create({
      data: {
        destination: "New York",
        description: "Business summit and sightseeing",
        start_date: new Date("2024-05-15T10:00:00Z"),
        end_date: new Date("2024-05-20T17:00:00Z"),
      },
    });

    await prisma.participant.create({
      data: {
        name: "Eve Smith",
        email: "alice@example.com",
        trip_id: 1,
      },
    });

    await prisma.expense.create({
      data: {
        name: "Conference Hotel",
        description: "Accommodation for business summit",
        value: 1250.75,
        trip_id: 1,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
