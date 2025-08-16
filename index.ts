import { writeFileSync } from 'fs'


function eloZelo(times: number): void {
    const text = "Elo żelo";
    const output = Array(times).fill(text).join('\n');
    
    writeFileSync('elo-zelo.txt', output, 'utf8');
}

const minutes = new Date().getMinutes();
eloZelo(minutes);