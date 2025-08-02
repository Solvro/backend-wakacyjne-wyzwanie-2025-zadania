import { sys } from "typescript";

let minutes: number = new Date().getMinutes();

function eloZelo(numofrec:number): void {
    let text: string = "";
    if (numofrec < 0) {
        throw new Error("Number of records cannot be negative");
    }
    while (numofrec > 0) {
        text += "Elo żelo\n";
        numofrec--;
    }   
    if (text.length > 0) {
        text.endsWith("\n") ? text = text.slice(0, -1) : null;
    }
    sys.writeFile("elo-żelo.txt", text);
}
eloZelo(minutes);

