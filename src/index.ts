import * as fs from "node:fs";

function eloZelo(ilosc: number): void {
  const content = "elo żelo\n".repeat(ilosc);

  for (let i: number = 0; i < ilosc; i++) {
    fs.writeFile("elo-żelo.txt", content, (err: any) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File written succesfully!");
      }
    });
  }
}

const now = new Date();
let minutes = now.getMinutes();
eloZelo(minutes);
