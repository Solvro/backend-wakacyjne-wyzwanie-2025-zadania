import { writeFile } from 'fs/promises';

async function eloZelo (num: number) {
    const line = "Elo żelo";
    let content = "";
    
    for( let i = 0; i < num; i++){
            console.log(line);
            content += line + "\n";
    }

    try {
        await writeFile("elo-żelo.txt", content, { encoding: "utf8" });
    } catch (err) {
        console.error("Zapis do pliku nieudany: ", err);
    }
}

const minutes = new Date().getMinutes();
eloZelo(minutes);