import * as fs from "fs";

function eloZelo( n : number ) : void {
	 const text = 'Elo żelo';
	 const path: string = 'elo-żelo.txt';
	 const filecontent = Array<string>(n).fill(text).join('\n');
	 fs.writeFileSync(path, filecontent, 'utf-8');
}

const minutes: number = new Date().getMinutes();

eloZelo(minutes);
