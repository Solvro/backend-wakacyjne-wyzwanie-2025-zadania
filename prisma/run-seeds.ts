import { seedDatabase } from "./seeds";

async function main() {
  await seedDatabase();
}

void main();
