import { writeFileSync } from "fs";

function eloZelo(repeats: number)
{
    const content = "Elo żelo\n".repeat(repeats);

    writeFileSync("elo-żelo.txt", content, {
        flag: "w"
    })

}

let minutesNow = new Date().getMinutes();
eloZelo(minutesNow)
 