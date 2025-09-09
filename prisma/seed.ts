import { AccountStatus, ExpenseStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const participant = await prisma.participant.create({
    data: {
      name: "Tytus",
      lastName: "Bomba",
      email: "kapitan.bomba@example.com",
      status: AccountStatus.ACTIVE,
    },
  });

  const trip = await prisma.trip.create({
    data: {
      title: "Testowa wycieczka",
      destination: "Galaktyka",
      startDate: new Date("2025-09-10"),
      endDate: new Date("2025-09-15"),
    },
  });

  await prisma.participantOnTrip.create({
    data: {
      participantId: participant.id,
      tripId: trip.id,
    },
  });

  await prisma.expense.create({
    data: {
      title: "Paliwo",
      amount: 21.37,
      status: ExpenseStatus.PAID,
      paymentDate: new Date(),
      tripId: trip.id,
      payingParticipantId: participant.id,
    },
  });

  console.warn("Seed complete");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
