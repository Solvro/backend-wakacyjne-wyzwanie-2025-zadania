import { writeFileSync } from "fs";

function eloZelo(repetitions: number): void {
    const sentence: string = "Elo żelo\n";
    const content: string = sentence.repeat(repetitions);

    for(let i = 0; i < repetitions; i++) {
        writeFileSync("elo-zelo.txt", content);
    }
}

const date: Date = new Date();
eloZelo(date.getMinutes());