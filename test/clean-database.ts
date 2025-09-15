import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cleanDatabase() {
  const tablenames: { tablename: string }[] = await prisma.$queryRaw`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname='public'
  `;

  for (const { tablename } of tablenames) {
    if (tablename !== "_prisma_migrations") {
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`,
      );
    }
  }
}
