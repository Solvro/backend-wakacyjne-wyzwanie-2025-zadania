var fs_1 = require("fs");

function eloZelo(repeats: number)
{
    const content = "Elo żelo\n".repeat(repeats);
    fs_1.writeFileSync("elo-żelo.txt", content)
}

let minutesNow = new Date().getMinutes();
eloZelo(minutesNow)
 