import { writeFileSync } from 'fs';

function eloZelo(x: number) {
    let data = "";
    for (let i = 0; i < x; i++) {
        data += "Elo żelo\n";
    }
    writeFileSync('elo-żelo.txt', data, 'utf8');
}

const date = new Date();
const minute = date.getMinutes()

eloZelo(minute)