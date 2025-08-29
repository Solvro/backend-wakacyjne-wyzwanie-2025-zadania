import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const Trip = await prisma.trip.upsert({
    where: { id: 0 },
    update: {},
    create: {
      Destination: "Trip to the mountains",
      Description: "A relaxing trip to the mountains with friends.",
      Start_date: new Date("2023-10-01"),
      End_date: new Date("2023-10-07"),
    },
  });

  const Participant = await prisma.participant.upsert({
    where: { id: 0 },
    update: {},
    create: {
      Name: "Dill Doe",
      Date_of_birth: new Date("1990-01-01"),
      Email: "KGHMPolskaMiedź@kghm.com",
      Trip_id: Trip.id,
    },
  });

  const Expense = await prisma.expense.upsert({
    where: { id: 0 },
    update: {},
    create: {
      Name: "Hotel Booking",
      Description: "Booking for the hotel during the trip.",
      Value: 500.45,
      Trip_id: Trip.id,
      Participant_id: Participant.id,
    },
  });
  console.warn(Expense, "Expense created successfully");
  console.warn(Trip, "Trip created successfully");
  console.warn(Participant, "Participant created successfully");
  console.warn("Seed completed successfully");
};
main().catch((error: unknown) => {
  console.warn("Error While generating Seed: \n", error);
});
