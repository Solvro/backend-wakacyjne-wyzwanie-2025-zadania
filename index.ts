import fs from 'fs'

const eloZelo = (n: number): void => {
  const fileContent = 'Elo żelo\n'.repeat(n).trim()
  fs.writeFileSync('elo-żelo.txt', fileContent, 'utf-8')
}

const now = new Date()
eloZelo(now.getMinutes())