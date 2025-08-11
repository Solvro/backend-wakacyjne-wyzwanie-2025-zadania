const fs = require("node:fs");

function eloZelo(count: number) {
  try {
    for (let i = 0; i < count; i++) {
      fs.appendFileSync("elo-żelo.txt", "Elo żelo\n");
    }
  } catch (err) {
    console.error(err);
  }
}

const currentMinutes = new Date().getMinutes();

eloZelo(currentMinutes);
