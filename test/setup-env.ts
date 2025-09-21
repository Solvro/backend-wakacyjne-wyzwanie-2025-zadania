import { config } from "dotenv";
import path from "node:path";

/* eslint-disable unicorn/prefer-module */
// config({ path: path.resolve(__dirname, "../../.env.test") });
config({ path: path.resolve(__dirname, "../../.env") });
/* eslint-enable unicorn/prefer-module */
