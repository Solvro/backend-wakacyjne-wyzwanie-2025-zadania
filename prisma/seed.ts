import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      participant_id: 1,
      date_start: new Date('2025-08-08T12:34:56Z'),
    },
  });

  const participant = await prisma.participant.create({
    data: {
      first_name: 'Maria',
      second_name: 'Magdalena',
      last_name: 'Kowalska',
      gender: 'female',
    },
  });

  await prisma.expense.create({
    data: {
      price: 2500.12,
      trip_id: 1,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
