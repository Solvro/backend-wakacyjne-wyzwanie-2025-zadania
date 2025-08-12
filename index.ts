import { writeFileSync } from "fs";

function eloZelo(count: number) {
  const line = "Elo żelo";
  let textToWrite = "";

  for (let i = 0; i < count; i++) {
    textToWrite += line + "\n";
  }

  writeFileSync("elo-żelo.txt", textToWrite, "utf8");
}

const minutes: number = new Date().getMinutes();

eloZelo(minutes);
