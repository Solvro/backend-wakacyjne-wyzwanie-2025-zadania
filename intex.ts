import { writeFileSync } from 'fs';

function eloZelo(count: number): void {
    const text = "Elo żelo";
    const content = Array(count).fill(text).join('\n');

    writeFileSync("elo-zelo.txt", content, 'utf-8');
}

const now = new Date();
const minutes = now.getMinutes();


eloZelo(minutes);