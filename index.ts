import * as fs from 'fs';
import * as path from 'path';

function eloZelo(count: number): void {
  const content = Array(count).fill('Elo żelo').join('\n');
  const filePath = path.join(__dirname, 'elo-żelo.txt');

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Blad', err);
    } else {
      console.log(`Plik elo-żelo.txt zostal zapisany.`);
    }
  });
}

const currentMinutes = new Date().getMinutes();

eloZelo(currentMinutes);
