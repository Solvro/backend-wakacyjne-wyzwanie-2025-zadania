import { EXPENSETYPE, PrismaClient, ROLE } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: "Weekend w Krakowie",
      destination: "Kraków",
      start_date: new Date("2025-09-01"),
      end_date: new Date("2025-09-03"),
      budget: 1200.0,
    },
  });

  const participant = await prisma.participant.create({
    data: {
      first_name: "Jan",
      last_name: "Kowalski",
      email: "jan.kowalski@example.com",
      role: ROLE.organizer,
      trip: {
        connect: { trip_id: trip.trip_id },
      },
    },
  });

  const expense = await prisma.expense.create({
    data: {
      expense_type: EXPENSETYPE.food,
      expense_date: new Date("2025-09-01"),
      cost: 85.5,
      description: "Obiad w restauracji",
      trip: {
        connect: { trip_id: trip.trip_id },
      },
    },
  });

  console.log("Działa");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
