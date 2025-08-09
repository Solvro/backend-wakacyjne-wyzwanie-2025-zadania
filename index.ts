import * as fs from 'node:fs';


function eloZelo(num: number){
    const a = "Elo żelo\n".repeat(num)
    console.log(a);
    fs.writeFileSync('elo-zelo.txt', a);
}

const date = new Date();
const minutes = date.getMinutes();

eloZelo(minutes);
