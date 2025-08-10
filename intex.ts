import { writeFileSync } from "fs";

function eloZelo(times: number): void {
  let content = "";

  for (let i = 0; i < times; i++) {
    content += "Elo żelo\n";
  }

  writeFileSync("elo-żelo.txt", content, "utf8");
}

const minutes: number = new Date().getMinutes();
eloZelo(minutes);
