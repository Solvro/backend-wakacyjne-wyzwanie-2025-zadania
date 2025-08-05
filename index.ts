import * as fs from 'node:fs';

function eloZelo (n: number): void {
    let content: string = "";
    for (let i: number = 0; i < n; i++) {
        content += "Elo żelo\n";
    }
    fs.writeFile('elo-żelo.txt', content, err => {
    if (err) {
        console.error(err);
    }
    });
}

const now = new Date();
const minutes = now.getMinutes();
eloZelo(minutes);
