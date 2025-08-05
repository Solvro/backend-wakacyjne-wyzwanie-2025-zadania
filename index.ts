import { writeFileSync } from 'fs'

function eloZelo(repeats: number): void {
  const text: string = 'Elo żelo'
  const file: string = './elo-żelo.txt'
  writeFileSync(file, '')
  for (let i: number = 0; i < repeats; i++) {
    writeFileSync(file, text + '\n', { flag: 'a' })
    console.log(text)
  }
}

let minutes: number = new Date().getMinutes()
let message: string = `minutes: ${minutes}`
console.log(message)
eloZelo(minutes)
