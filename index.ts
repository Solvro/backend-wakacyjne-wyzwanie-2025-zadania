import * as fs from 'fs';

function eloZelo(n: number): void{
    let content = '';
    for(let i = 0;i < n; i++) {
        content += 'Elo żelo\n';
    }
    fs.writeFileSync('elo-żelo.txt', content, 'utf8');
}

let n = new Date().getMinutes();
eloZelo(n);

console.log('elo zelo');
