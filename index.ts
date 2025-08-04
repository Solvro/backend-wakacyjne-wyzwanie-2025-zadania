import { writeFileSync } from "fs"

function eloZelo(x: number): void {
    const filePath: string = "elo-zelo.txt";
    const message: string = "Elo żelo\n";
    
    let content: string = "";
    for (let i: number = 0; i < x; i++) {
        content += message;
    }
    writeFileSync(filePath, content, "utf-8");
}

const now = new Date();
const minutes = now.getMinutes();
eloZelo(minutes);