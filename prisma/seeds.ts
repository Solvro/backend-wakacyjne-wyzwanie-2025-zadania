import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const janusz = await prisma.participant.upsert({
    where: { email: "janusz@example.com" },
    update: {},
    create: {
      name: "Janusz",
      birthday: new Date("1999-01-01"),
      email: "janusz@example.com",
    },
  });

  const trip = await prisma.trip.create({
    data: {
      name: "Wycieczka do Wrocławia",
      date_start: new Date("2025-08-13"),
      date_end: new Date("2025-08-14"),
      description: "wycieczka na politechnike",
    },
  });

  await prisma.expense.create({
    data: {
      title: "Bilet PKP",
      category: ["Transport"],
      amount: 21.37,
      date: new Date("2025-08-13"),
      trip_id: trip.trip_id,
      participant_id: janusz.participant_id,
    },
  });

  await prisma.tripParticipant.create({
    data: {
      trip_id: trip.trip_id,
      participant_id: janusz.participant_id,
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
