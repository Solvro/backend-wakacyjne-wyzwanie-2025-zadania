import prisma from "./prisma";

export async function clear(): Promise<void> {
  try {
    // Najpierw usuwamy tabele zależne
    await prisma.expense_participant.deleteMany();
    await prisma.trip_participant.deleteMany();

    // Potem główne tabele
    await prisma.expense.deleteMany();
    await prisma.participant.deleteMany();
    await prisma.trip.deleteMany();
    await prisma.user.deleteMany();
  } catch (error) {
    console.error("❌ Error during clear:", error);
    throw error;
  }
}
