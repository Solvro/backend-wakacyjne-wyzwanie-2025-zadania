import { Category, PrismaClient, Role } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      location: "Testowa lokacja",
      participants: {
        create: [
          {
            name: "Jan Grzudziadzki",
            email: "jangrudziadz@gmail.com",
            role: Role.ORGANIZER,
          },
        ],
      },
      expenses: {
        create: [
          {
            amount: 100,
            category: Category.ACCOMMODATION,
            transaction_time: new Date(),
          },
        ],
      },
    },
  });

  console.warn("seedowanie zakończone");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
