import { writeFileSync } from "fs";

const current_minute: number = (new Date().getMinutes());


function eloZelo(nbr: number){
    let txt: string = "";
    for (var i=0; i<nbr; i++){
        txt = (txt + "Elo żelo\n");
    }
     writeFileSync("elo-żelo.txt", txt)
}

eloZelo(current_minute);
