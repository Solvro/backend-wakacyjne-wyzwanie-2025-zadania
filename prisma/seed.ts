import { PrismaClient, sex } from "../generated/prisma";

const prisma = new PrismaClient();

const initialParticipants = [
  {
    first_name: "Ala",
    last_name: "Makota",
    address: "Zielona 3",
    phone_number: 2137,
    sex: sex.FEMALE,
  },
  {
    first_name: "Jan",
    last_name: "Paweł",
    address: "Kremówkowa 2",
    sex: sex.MALE,
  },
  {
    first_name: "Jaś",
    last_name: "Melon",
    address: "Zielona 3",
    phone_number: 3123211,
  },
];

const initialTrips = [
  {
    participant_id: 1,
    destination: "Japan",
    start_date: new Date("2025-08-10"),
    end_date: new Date("2025-08-20"),
  },
];

const initialExpenses = [
  { trip_id: 2, expense_amount: 1978, expense_description: "Hotel" },
];

async function main() {
  await prisma.expense.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.participant.deleteMany();

  const [ala, jan, jas] = await Promise.all(
    initialParticipants.map((p) => prisma.participant.create({ data: p })),
  );

  const trips = await Promise.all([
    prisma.trip.create({
      data: {
        participant_id: ala.participant_id,
        destination: "Japonia",
        start_date: new Date("2025-07-01"),
        end_date: new Date("2025-07-14"),
      },
    }),
    prisma.trip.create({
      data: {
        participant_id: jan.participant_id,
        destination: "Berlin",
        start_date: new Date("2025-08-10"),
        end_date: new Date("2025-08-15"),
      },
    }),
  ]);

  await Promise.all([
    prisma.expense.create({
      data: {
        trip_id: trips[0].trip_id,
        expense_amount: 1978,
        expense_description: "Hotel",
      },
    }),
    prisma.expense.create({
      data: {
        trip_id: trips[1].trip_id,
        expense_amount: 120,
        expense_description: "Transport",
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
