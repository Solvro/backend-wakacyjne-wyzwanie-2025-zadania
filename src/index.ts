import * as fs from "node:fs";

function eloZelo(ilosc: number): void {
  const content = "elo żelo\n".repeat(ilosc);

  for (let index = 0; index < ilosc; index++) {
    fs.writeFile("elo-żelo.txt", content, (error: unknown) => {
      if (error instanceof Error) {
        console.error(error);
      } else {
        console.warn("File written successfully!");
      }
    });
  }
}

const now = new Date();
const minutes: number = now.getMinutes();
eloZelo(minutes);
