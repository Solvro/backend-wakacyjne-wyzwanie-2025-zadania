export const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://user:password@localhost:5432/budzetownik?schema=public";

export const EXPIRY_TIME_MS = Number.parseInt(
  process.env.EXPIRY_TIME_MS ?? "3600000", // Default 1 hour in milliseconds
);
