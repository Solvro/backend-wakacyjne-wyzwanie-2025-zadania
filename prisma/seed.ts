import { ExpenseCategory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...\n");
  await prisma.expense.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.participant.deleteMany();

  console.log("Creating participants...");

  const participant1 = await prisma.participant.create({
    data: {
      name: "Jan Kowalski",
      email: "jan.kowalski@wp.pl",
    },
  });

  console.log("Participants created:");
  console.log(participant1);

  console.log("Creating trips...");

  const trip1 = await prisma.trip.create({
    data: {
      name: "Wakacje Grecja 2025",
      destination: "Ateny, Grecja",
      startDate: new Date("2025-09-05T10:00:00Z"),
      endDate: new Date("2025-09-15T18:00:00Z"),
      budget: 5000.0,
      participants: {
        connect: {
          id: participant1.id,
        },
      },
    },
  });

  console.log("Trips created:");
  console.log(trip1);

  console.log("Creating expenses...");

  const expense1 = await prisma.expense.create({
    data: {
      description: "Bilety lotnicze",
      amount: 1250.5,
      date: new Date("2025-07-20T12:00:00Z"),
      category: ExpenseCategory.TRANSPORTATION,
      trip: {
        connect: {
          id: trip1.id,
        },
      },
      paidBy: {
        connect: {
          id: participant1.id,
        },
      },
    },
  });

  console.log("Expenses created:");
  console.log(expense1);

  console.log(`\nSeeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
