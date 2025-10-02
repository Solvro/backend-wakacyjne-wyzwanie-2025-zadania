import { ExpenseCategory, ParticipantRole, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const trip = await prisma.trip.create({
    data: {
      name: "Budzetowa podrurz",
      startDate: new Date("2025-08-17"),
      budget: 5000,
      participants: {
        create: [
          {
            name: "Marcin",
            lastname: "Kujawski",
            role: ParticipantRole.ORGANIZER,
            email: "marcin@example.com",
          },
          {
            name: "Ola",
            lastname: "Cocacola",
            role: ParticipantRole.MEMBER,
            email: "Nola@example.com",
          },
        ],
      },
    },
    include: { participants: true },
  });

  await prisma.expense.create({
    data: {
      participantId: trip.participants[0].id,
      amount: 350.75,
      category: ExpenseCategory.TRAVEL,
      note: "Bilety na kolej",
      amountPLN: 350.75,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error("FAILURE!!! ERROR:", error);
    await prisma.$disconnect();
    throw error;
  });
