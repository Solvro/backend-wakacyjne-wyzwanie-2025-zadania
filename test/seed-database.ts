import { Category, PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedDatabase() {
  const trip = await prisma.trip.create({
    data: {
      name: "Wycieczka do Wrocławia",
      date_start: new Date("2025-08-13"),
      date_end: new Date("2025-08-14"),
      description: "wycieczka na politechnike",
    },
  });
  const janusz = await prisma.participant.create({
    data: {
      name: "Janusz",
      email: "janusz@example.com",
      password: "Sigma admin 123",
      role: Role.Admin,
      isEnabled: true,
    },
  });
  await prisma.expense.create({
    data: {
      title: "Bilet PKP",
      category: Category.Transport,
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
