import { writeFileSync } from "fs"

function eloZelo(x: number): void {
  const content = Array(x).fill("Elo żelo").join("\n");
  fs.writeFileSync("elo-żelo.txt", content, "utf-8");
}

const d = new Date();
const minutes = d.getMinutes();

eloZelo(minutes);
