import { writeFileSync } from 'fs'


function eloZelo(count: number): void {
    const content = Array(count).fill('Elo żelo').join('\n')
    writeFileSync('elo-żelo.txt', content, 'utf8')
}

const currentMinutes: number = new Date().getMinutes()

eloZelo(currentMinutes)