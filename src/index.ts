import * as fs from "node:fs";

function eloZelo(ilosc: number): void {
  const content = "elo żelo\n".repeat(ilosc);

  for (let i: number = 0; i < ilosc; i++) {
    fs.writeFile("elo-żelo.txt", content, (err: unknown) => {
      if (err instanceof Error) {
        console.error(err);
      } else {
        console.warn("File written successfully!");
      }
    });
  }
}

const now = new Date();
const minutes: number = now.getMinutes();
eloZelo(minutes);
