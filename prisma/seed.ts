import { AccountType, PrismaClient, Role } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.participant.createMany({
    data: [
      {
        name: "Jan",
        surname: "Nowak",
        account_type: AccountType.BASIC,
        email: "JanNowak@example.com",
        password: await hash("test", 10),
        role: Role.COORDINATOR,
      },
      {
        name: "Katarzyna",
        surname: "Kowalska",
        account_type: AccountType.PREMIUM,
        email: "KatarzynaKowalska@example.com",
        password: await hash("test", 10),
        role: Role.USER,
      },
      {
        name: "Marek",
        surname: "Kowal",
        account_type: AccountType.TRIAL,
        email: "MarekKowal@example.com",
        password: await hash("test", 10),
        role: Role.ADMIN,
      },
    ],
  });

  await prisma.trip.createMany({
    data: [
      {
        name: "Góry",
        begin_date: new Date("2025-08-15"),
        end_date: new Date("2025-08-18"),
      },
      {
        name: "Jezioro",
        begin_date: new Date("2025-08-22"),
        end_date: new Date("2025-08-24"),
      },
    ],
  });

  const [jan, katarzyna] = await prisma.participant.findMany();
  const [mountains, lake] = await prisma.trip.findMany();

  await prisma.tripParticipant.createMany({
    data: [
      { trip_id: mountains.id, participant_id: jan.id },
      { trip_id: lake.id, participant_id: katarzyna.id },
    ],
  });

  const [tparticipant1, tparticipant2] =
    await prisma.tripParticipant.findMany();

  await prisma.expense.createMany({
    data: [
      {
        value: 18.99,
        trip_participant_id: tparticipant1.id,
        name: "Jedzenie",
        date: new Date("2025-08-23"),
        description: "Obiad w restauracji",
      },
      {
        value: 99.99,
        trip_participant_id: tparticipant2.id,
        date: new Date("2025-08-29"),
        name: "Zakupy",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    throw new Error("query failed");
  });
