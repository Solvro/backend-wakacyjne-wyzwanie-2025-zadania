const fs = require('fs');


function elo_zelo(cnt: number): void {
    const eloZelo = "Elo żelo"
    let content = "";
    for(let i:number = 0; i < cnt ; i++)
    {
        if(i != cnt-1)
        {
            content += eloZelo + "\n";
        }
        else {
            content += eloZelo
        }
    }
     fs.writeFileSync("elo-zelo.txt", content, "utf8")

}

const min = new Date().getMinutes();
elo_zelo(min);