import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const jan = await prisma.participant.create({
    data: {
      name: 'Jan',
      surname: 'Kowalski',
      role: 1, // to będzie organizator
    },
  });

  const anna = await prisma.participant.create({
    data: {
      name: 'Anna',
      surname: 'Nowak',
      role: 2, // uczestnik
    },
  });

  const trip = await prisma.trip.create({
    data: {
      name: 'Wycieczka do Rzymu',
      startDate: new Date('2025-09-01'),
      endDate: new Date('2025-09-10'),
      totalCost: 3000,
    },
  });

  await prisma.expanse.createMany({
    data: [
      {
        tripId: trip.id,
        amount: 1200,
        category: 'Transport',
        description: 'Bilety lotnicze',
        date: new Date('2025-09-01'),
      },
      {
        tripId: trip.id,
        amount: 1000,
        category: 'Hotel',
        description: 'Noclegi w centrum',
        date: new Date('2025-09-02'),
      },
      {
        tripId: trip.id,
        amount: 800,
        category: 'Jedzenie',
        description: 'Restauracje i kawiarnie',
        date: new Date('2025-09-03'),
      },
    ],
  });

  await prisma.tripParticipant.createMany({
    data: [
      {
        tripId: trip.id,
        participantId: jan.id,
      },
      {
        tripId: trip.id,
        participantId: anna.id,
      },
    ],
  });

  console.log('Sedowanie zakończone');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
