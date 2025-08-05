import { writeFileSync } from "fs"

function eloZelo(n: number): void {
  const line = "Elo żelo"
  let content = ""

  for (let i: number = 0; i < n; i++) {
    content += line + "\n"
    console.log(line)
  }  
  writeFileSync("elozelo.txt", content, "utf8")

}

const date = new Date()
const minutes = date.getMinutes()

eloZelo(minutes)