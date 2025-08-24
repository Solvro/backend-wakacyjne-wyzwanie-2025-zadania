export const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://user:password@localhost:5432/budzetownik?schema=public";
