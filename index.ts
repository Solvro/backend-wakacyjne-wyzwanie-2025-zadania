const fs = require('fs');
const now = new Date();
const minuty = now.getMinutes();
function eloZelo(x) {
	let tablica = '';
	for (let i = 0; i < x; i++) {
		tablica += 'Elo zelo\n';
	}
	fs.writeFileSync('elo-zelo.txt', tablica, 'utf8');
}
eloZelo(minuty);
