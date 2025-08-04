import * as fs from 'fs';

function eloZelo(times: number): void {
  const line = "Elo żelo";
  const content = Array<string>(times).fill(line).join("\n");

  fs.writeFileSync("elo-zelo.txt", content, "utf8");

  for (let i: number = 0; i < times; i++) {
    console.log(line);
  }
}

const now = new Date();
const minutes = now.getMinutes();

eloZelo(minutes);