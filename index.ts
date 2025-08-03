import { writeFileSync } from 'fs'

function eloZelo(n: number):void
{
    var content: string =""
    for (let i=0; i<n; i++){
        content+= "Elo żelo \n"
    }
    writeFileSync("elo-żelo.txt", content, "utf-8")
}
const minutes: number= new Date().getMinutes()
eloZelo(minutes)
