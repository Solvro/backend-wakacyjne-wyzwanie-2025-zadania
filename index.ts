import { writeFileSync } from "fs"

function eloZelo(x: number): void {
  const line = "Elo żelo";
  writeFileSync("elo-zelo.txt", Array(x).fill(line).join("\n"), "utf8");
}

eloZelo((new Date()).getMinutes());
