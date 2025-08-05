import { writeFile } from 'node:fs/promises';

async function eloZelo(repeat: number): Promise<void> {
    const insertElo = "Elo żelo ".repeat(repeat);
    try {
        await writeFile('elo-żelo.txt', insertElo);
        console.log('File written successfully');
    } catch (err) {
        const error = err as NodeJS.ErrnoException;
        console.error('Error writing file:', error.message);
    }
}

async function main(): Promise<void> {
    const minutes = new Date().getMinutes();
    await eloZelo(minutes);
}

main();
