import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cleanDatabase() {
  try {
    await prisma.$executeRawUnsafe("SET session_replication_role = replica;");

    const tablenames = await prisma.$queryRaw<
      { tablename: string }[]
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    for (const { tablename } of tablenames) {
      if (tablename !== "_prisma_migrations") {
        try {
          await prisma.$executeRawUnsafe(
            `TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`,
          );
        } catch (error) {
          console.warn(
            `Failed to truncate ${tablename}, trying delete:`,
            error,
          );
          await prisma.$executeRawUnsafe(`DELETE FROM "${tablename}";`);
        }
      }
    }

    await prisma.$executeRawUnsafe("SET session_replication_role = DEFAULT;");
  } catch (error) {
    console.error("Error cleaning database:", error);
    try {
      await prisma.$executeRawUnsafe("SET session_replication_role = DEFAULT;");
    } catch (resetError) {
      console.error("Failed to reset session_replication_role:", resetError);
    }
    throw error;
  }
}
