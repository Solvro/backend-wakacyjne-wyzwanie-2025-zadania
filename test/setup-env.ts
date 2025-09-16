import { config } from "dotenv";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env.test");
/* eslint-disable unicorn/prefer-module */
// const envPath = path.resolve(__dirname, "../../.env.test");
// config({ path: path.resolve(__dirname, "../../.env") });
/* eslint-enable unicorn/prefer-module */
// eslint-disable-next-line no-console
console.log("Loading env from:", envPath);

config({ path: envPath });

// eslint-disable-next-line no-console
console.log("DATABASE_URL inside setup-env.ts:", process.env.DATABASE_URL);
