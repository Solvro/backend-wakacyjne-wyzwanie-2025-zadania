import { faker } from "@faker-js/faker";

import { PrismaClient } from "../generated/prisma";
import type { Prisma } from "../generated/prisma";

const prisma = new PrismaClient();
async function main() {
  const trip_data: Prisma.TripCreateInput = {
    start_date: faker.date.past(),
    price_per_person: 4782,
    people_count: 54,
    status: "in_progress",
  };
  const trip = await prisma.trip.create({ data: trip_data });

  await prisma.expense.create({
    data: {
      amount: 123,
      note: faker.lorem.sentence(),
      trip: { connect: { id: trip.id } },
    },
  });

  await prisma.participant.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.lorem.word(),
      trip: { connect: { id: trip.id } },
    },
  });
}
main().catch((error: unknown) => {
  console.error(error);
});
