import { ExpenseType, PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "jan.kowalski@example.com",
        name: "Jan Kowalski",
        password:
          "$2b$12$va3nsup7yqWJP9Ae9adYE.CJ4GqSxa8Lr3T0Dx93tSgPp7g1R.R7y", 
        role: Role.ADMIN,
        isEnabled: true,
      },
      {
        email: "edyta@gmail.com",
        name: "Edyta Kowalska",
        password:
          "$2b$12$va3nsup7yqWJP9Ae9adYE.CJ4GqSxa8Lr3T0Dx93tSgPp7g1R.R7y",
        role: Role.USER,
        isEnabled: true,
      },
      {
        email: "marek@gmail.com",
        name: "Marek Kowalski",
        password:
          "$2b$12$va3nsup7yqWJP9Ae9adYE.CJ4GqSxa8Lr3T0Dx93tSgPp7g1R.R7y",
        role: Role.USER,
        isEnabled: false,
      },
    ],
    skipDuplicates: true,
  });


  const trip = await prisma.trip.create({
    data: {
      name: "Weekend w Krakowie",
      destination: "Kraków",
      start_date: new Date("2025-09-01"),
      end_date: new Date("2025-09-03"),
      budget: 1200.0,
    },
  });


  await prisma.participant.create({
    data: {
      first_name: "Jan",
      last_name: "Kowalski",
      email: "jan.kowalski@example.com", 
      role: Role.ORGANIZER,
      trip_id: trip.trip_id, 
    },
  });


  await prisma.expense.create({
    data: {
      expense_type: ExpenseType.FOOD,
      expense_date: new Date("2025-09-01"),
      cost: 85.5,
      description: "Obiad w restauracji",
      trip_id: trip.trip_id, 
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
