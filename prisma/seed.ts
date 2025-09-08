import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  const adminPassword: string = await bcrypt.hash("admin123", saltRounds);
  const coordinatorPassword: string = await bcrypt.hash(
    "coordinator123",
    saltRounds,
  );
  const userPassword: string = await bcrypt.hash("user123", saltRounds);

  const _adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: adminPassword,
      role: Role.ADMIN,
      name: "Josh Admin",
      about_me: "I am an admin",
    },
  });

  const coordinatorUser = await prisma.user.upsert({
    where: { email: "coordinator@example.com" },
    update: {},
    create: {
      email: "coordinator@example.com",
      password: coordinatorPassword,
      role: Role.COORDINATOR,
      name: "John Coordinator",
      about_me: "I am a coordinator",
    },
  });

  const normalUser = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      password: userPassword,
      role: Role.USER,
      name: "Jane User",
      about_me: "I am a normal user",
    },
  });

  const trip = await prisma.trip.upsert({
    where: { trip_id: 1 },
    update: {},
    create: {
      destination: "Rejkiawik",
      description: "Wycieczka do Islandii",
      start_date: new Date("2025-09-01"),
      end_date: new Date("2025-09-15"),
    },
  });

  const participant1 = await prisma.participant.upsert({
    where: { participant_id: 1 },
    update: {},
    create: {
      first_name: "Jan",
      last_name: "Kowalski",
      email: "jan.kowalski@example.com",
      phone: "+48123456789",
      created_by_user_id: normalUser.user_id,
    },
  });

  const participant2 = await prisma.participant.upsert({
    where: { participant_id: 2 },
    update: {},
    create: {
      first_name: "Anna",
      last_name: "Nowak",
      email: "anna.nowak@example.com",
      phone: "+48123456788",
      created_by_user_id: coordinatorUser.user_id,
    },
  });

  const _expense1 = await prisma.expense.upsert({
    where: { expense_id: 1 },
    update: {},
    create: {
      amount: 234.56,
      category: "TRANSPORT",
      description: "Bilet lotniczy",
      trip_id: trip.trip_id,
    },
  });

  const _expense2 = await prisma.expense.upsert({
    where: { expense_id: 2 },
    update: {},
    create: {
      amount: 150,
      category: "FOOD",
      description: "Obiad w restauracji",
      trip_id: trip.trip_id,
    },
  });

  const _tripParticipants = await prisma.tripParticipants.upsert({
    where: {
      trip_id_participant_id: {
        trip_id: trip.trip_id,
        participant_id: participant1.participant_id,
      },
    },
    update: {},
    create: {
      trip_id: trip.trip_id,
      participant_id: participant1.participant_id,
    },
  });

  const _tripParticipants2 = await prisma.tripParticipants.upsert({
    where: {
      trip_id_participant_id: {
        trip_id: trip.trip_id,
        participant_id: participant2.participant_id,
      },
    },
    update: {},
    create: {
      trip_id: trip.trip_id,
      participant_id: participant2.participant_id,
    },
  });
}

main()
  .catch((error: unknown) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
