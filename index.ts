import * as fs from 'fs'

function eloZelo(numberOfLines :number):void{
    
    const text="Elo żelo\n";
    for (let index = 0; index < numberOfLines; index++) {
        fs.appendFileSync('elo-żelo.txt',text);
    }


}

const now= new Date();
eloZelo(now.getMinutes());