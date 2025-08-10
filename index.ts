import { writeFileSync } from "fs"

function eloZelo(x: number): void {
  const content = Array<string>(x).fill("Elo żelo").join("\n")

  writeFileSync("elo-zelo.txt", content, "utf8")

  for (let i: number = 0; i < x; i++) {
    console.log("Elo żelo")
  }
}

const nowButJustMinutes = new Date().getMinutes()

eloZelo(nowButJustMinutes)
