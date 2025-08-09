import fs from 'fs';

/**
 * Writes "Elo żelo" into elo-żelo.txt 
 * @param count Number of "Elo żelo" to be written into file
 */
function eloZelo(count: number): void {
  let content: string = "";
  for (let i: number = 0; i < count; i++) {
    content += "Elo żelo\n";
  }

  fs.writeFile('./elo-żelo.txt', content, (err) => {
    if (err) {
      console.log(`ERROR: ${err}`);
      return;
    }
    console.log(`Elo żelo wpisane do pliku ${count} razy`);
  });
}

const now = new Date();
eloZelo(now.getMinutes())