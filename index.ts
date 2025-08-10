import {writeFile} from 'fs';

function eloZelo(n: number): void {
    const filePath = 'elo-żelo.txt'
    const line = 'Elo Żelo'
    const content = (): string => {
        let result: string = '';
        for (let i = 1; i <= n; i++) {
            result += `${line}\n`;
        }
        return result;
    }

    writeFile(filePath, content(), (err) => {
        console.log(err ? 'Error writing file' : 'File written successfully');
    })
}

const now = new Date();
const minutes = now.getMinutes();

eloZelo(minutes);