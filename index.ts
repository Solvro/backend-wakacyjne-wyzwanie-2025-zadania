import { writeFileSync } from 'fs'

function eloZelo(repeats: number): void {
  const line: string = 'Elo żelo'
  const file: string = 'elo-żelo.txt'
  const contents: string = `${line}\n`.repeat(repeats)
  writeFileSync(file, contents)
}

eloZelo(new Date().getMinutes())
