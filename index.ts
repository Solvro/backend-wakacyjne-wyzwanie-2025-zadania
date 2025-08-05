import { writeFileSync } from "fs";

function eloZelo(count: number): void {
  const fileName = "elo-żelo.txt";
  let content = "";

  for (let i = 0; i < count; i++) {
    content += "Elo żelo\n";
  }

  writeFileSync(fileName, content);
}

const dateNow = new Date();
const minutes = dateNow.getMinutes();

eloZelo(minutes);
