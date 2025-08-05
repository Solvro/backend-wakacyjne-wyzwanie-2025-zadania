import fs from 'fs';

function eloZelo(times: number): void {
    for (let i = 0; i <= times; i++) {
        try {
            fs.appendFileSync('elo-żelo.txt', 'Elo żelo\n', 'utf8');
        } catch (err) {
            console.error(err);
        }
    }
}

const currDate = new Date();
const currMinutes = currDate.getMinutes();

eloZelo(currMinutes);
