/* eslint-disable unicorn/no-empty-file */
// import { Prisma, PrismaClient, Type } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   // 1) Uczestnicy
//   const jan = await prisma.participant.create({
//     data: { firstName: "Jan", lastName: "Kowalski", email: "jan@example.com" },
//   });

//   const anna = await prisma.participant.create({
//     data: {
//       firstName: "Anna",
//       lastName: "Kowalska",
//       email: "anna@example.com",
//     },
//   });

//   // 2) Trip + powiązania M2M (implicit) przez connect
//   // const trip = await prisma.trip.create({
//   //   data: {
//   //     name: "testowy trip",
//   //     destination: "wroclaw",
//   //     budget: new Prisma.Decimal("100.50"),
//   //     startDate: new Date("2024-07-01"),
//   //     endDate: new Date("2024-07-10"),
//   //     coordinatorEmail: jan.email,
//   //     // participants relation removed due to schema mismatch
//   //   },
//   //   include: { participants: true, expenses: true },
//   // });

//   // 3) Wydatki (payer to Participant.id, tripId to Trip.id)
//   // await prisma.expense.create({
//   //   data: {
//   //     description: "Lunch near Colosseum",
//   //     cost: new Prisma.Decimal("35.50"),
//   //     type: Type.FOOD,
//   //     tripId: trip.id,
//   //     payerId: jan.id,
//   //   },
//   // });

//   // await prisma.expense.create({
//   //   data: {
//   //     description: "Metro 24h ticket",
//   //     cost: new Prisma.Decimal("7.00"),
//   //     type: Type.TRANSPORT,
//   //     tripId: trip.id,
//   //     payerId: anna.id,
//   //   },
//   // });
// }

// main()
//   .catch((error: unknown) => {
//     console.error(error);
//     throw error;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
