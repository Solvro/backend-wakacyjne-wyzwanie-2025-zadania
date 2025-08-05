import * as fs from "fs";

function eloZelo(numberOfLines: number): void {
  const textPart = "Elo żelo";
  let text: string = "";
  for (let index = 0; index < numberOfLines; index++) {
    text = text + textPart + "\n";
  }
  fs.appendFileSync("elo-żelo.txt", text);
}

const now = new Date();
eloZelo(now.getMinutes());
