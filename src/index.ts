import * as fs from "node:fs";

function eloZelo(ileRazy: number): void {
  let text = "Elo zelo";
  let result = text.repeat(ileRazy);
  fs.writeFileSync("elo-zelo.txt", result);
}

eloZelo(new Date().getMinutes());
