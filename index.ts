import {writeFileSync } from "fs";

function eloZelo(n: number): void {
    const content: string[] = []

    for(let i = 0; i < n; i++) {
        content.push("Elo żelo") 
    }

    writeFileSync("elo-żelo.txt", content.join("\n"), "utf8")
}

eloZelo(new Date().getMinutes())    