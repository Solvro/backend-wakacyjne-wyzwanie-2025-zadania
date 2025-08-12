import * as fs from 'fs';

function eloZelo(reps: number) {
    for(let i = 0; i < reps; i++) {
        fs.appendFile('elo-żelo.txt', 'Elo żelo\n', err => {
            if (err) {
                console.error(err);
            }
        });
    }
}

eloZelo(new Date().getMinutes());
