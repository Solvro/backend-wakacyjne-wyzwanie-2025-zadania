import fs from 'fs';

function eloZelo(times: number): void {
    for (let i: number = 0; i <= times; i++) {
            fs.appendFile('elo-żelo.txt', 'Elo żelo\n', 'utf8', (err) => {
                if (err) console.error(err);
            })
    }
}

const currDate: Date = new Date()
let currMinutes: number = currDate.getMinutes()

eloZelo(currMinutes)