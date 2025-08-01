import { writeFile } from 'fs'

function eloZelo(count: number): void {
    const text = 'Elo żelo'
    const content = Array(count).fill(text).join('\n')

    writeFile('elo-żelo.txt', content, err => console.log(err ? `Error creating file: ${err.message}` : 'File created successfully'))
}

const minutes: number = new Date().getMinutes()

eloZelo(minutes)
