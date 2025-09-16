import { PrismaClient, Role, Sex } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      title: "Trip to Paris",
      description: "A wonderful trip to the city of lights",
      startDate: new Date("2023-10-01"),
      endDate: new Date("2023-10-10"),
    },
  });

  await prisma.expense.createMany({
    data: [
      {
        tripId: trip.id,
        amount: 150,
        description: "Flight tickets",
      },
      {
        tripId: trip.id,
        amount: 300,
        description: "Hotel stay",
      },
      {
        tripId: trip.id,
        amount: 50,
        description: "Museum tickets",
      },
    ],
  });

  const user = await prisma.user.create({
    data: {
      email: "ab",
      name: "Kamil",
      middleName: "Paweł",
      lastName: "Kajta",
      sex: Sex.MALE,
      password: "$2a$12$lliHLJzDGts2MbtPuy8Ovu66QCl0YASC5zv3n4JIr4z5e/x185xcK",
      isEnabled: true,

      role: Role.ADMIN,
    },
  });

  await prisma.participant.create({
    data: {
      userEmail: user.email,
      tripId: trip.id,
    },
  });
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
