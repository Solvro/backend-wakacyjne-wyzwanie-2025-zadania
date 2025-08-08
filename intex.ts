import fs from 'fs'

const eloZelo = (amount: number):void => {
    const content:string = "Elo żelo \n".repeat(amount)
    fs.writeFile('elo-żelo.txt', content, {encoding: 'utf-8'}, (err) =>{
        if(err) return console.log(err);
    });
}

const date = new Date();
eloZelo(date.getMinutes())