import { PrismaClient, TripStatus, ExpenseCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const participant = await prisma.participant.create({
    data: {
      name: 'Jan Kowalski',
      email: 'jan@example.com',
    },
  });

  const trip = await prisma.trip.create({
    data: {
      name: 'Wycieczka do Zakopanego',
      destination: 'Zakopane',
      startDate: new Date('2025-09-01'),
      endDate: new Date('2025-09-05'),
      status: TripStatus.PLANNED,
    },
  });

  await prisma.tripParticipants.create({
    data: {
      tripId: trip.id,
      participantId: participant.id,
    },
  });

  await prisma.expense.create({
    data: {
      description: 'Kolacja w restauracji',
      amount: 150.5,
      category: ExpenseCategory.FOOD,
      tripId: trip.id,
      paidById: participant.id,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
