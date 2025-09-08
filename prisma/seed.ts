import { AuthRole, PrismaClient, Role } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = "password";

  const salt = 10;
  const hashedPassword = await hash(password, salt);

  const user = await prisma.user.create({
    data: {
      email: "jan.juskowiak@example.com",
      name: "Jan Juskowiak",
      password: hashedPassword,
      role: AuthRole.ADMIN,
      isEnabled: true,
    },
  });

  const trip = await prisma.trip.create({
    data: {
      name: "Test Trip",
      destination: "Brazil",
      start_date: new Date(),
      end_date: new Date(),
    },
  });

  const participant = await prisma.participant.create({
    data: {
      email: user.email,
      name: "Alice",
      role: Role.GUIDE,
      trips: {
        connect: { id: trip.id },
      },
    },
  });

  await prisma.expense.create({
    data: {
      description: "Hotel",
      amount: 2500,
      currency: "PLN",
      date: new Date(),
      trip_id: trip.id,
      participant_id: participant.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🦫✅ Seed completed");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
