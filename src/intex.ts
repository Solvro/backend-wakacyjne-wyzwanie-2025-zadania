import { writeFileSync } from 'fs';

function eloZelo(amount: number): void {
  const content: string = "Elo żelo\n".repeat(amount);
  const filePath: string = "./elo-żelo.txt";
  writeFileSync(filePath, content, 'utf8');
}

const numMinutes: number = new Date().getMinutes();
eloZelo(numMinutes);
