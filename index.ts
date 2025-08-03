import * as fs from 'fs';

function eloZelo(count: number): void {
    let subtitle = '';
    for (let i = 0; i < count; i++) {
        subtitle += 'Elo żelo\n';
    }
    fs.writeFileSync('elo-żelo.txt', subtitle, 'utf8');
    console.log(`Zapisano ${count} razy do pliku elo-żelo.txt`);
}

//const minutes = new Date().getMinutes();
eloZelo(new Date().getMinutes());
