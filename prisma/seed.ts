import { PrismaClient, TripStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const trip1 = await prisma.trip.upsert({
    where: { trip_id: 1 },
    update: {},
    create: {
      trip_id: 1,
      name: "Trip 1",
      start: new Date("2025-08-18"),
      end: new Date("2025-08-25"),
      status: TripStatus.PLANNED,
    },
  });

  console.log(trip1);

  const user1 = await prisma.participant.upsert({
    where: { participant_id: 1 },
    update: {},
    create: {
      participant_id: 1,
      name: "User 1",
      email: "user1@example.com",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
