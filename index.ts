import fs = require("fs");
import moment = require("moment");

function eloZelo(limit: number): void{
    fs.writeFileSync("elo-żelo.txt", "");

    for(let i: number = 0; i < limit; i++) {
        fs.appendFileSync("elo-żelo.txt", "Elo żelo\n");
    }
}

const time = new Date();
const parsedTime = moment(time).format("h:mm:ss");
const minutes = time.getMinutes();

eloZelo(minutes);

console.log("Aktualny czas: " + parsedTime);
console.log("Liczba minut: " + minutes);
console.log("Zapisano powitanie " + minutes + " razy do pliku elo-żelo.txt");
