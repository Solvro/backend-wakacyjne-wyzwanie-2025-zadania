"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function eloZelo(x) {
    var content = Array(x).fill("Elo żelo \n").join("");
    (0, fs_1.writeFileSync)("elo-zelo.txt", content, "utf8");
    for (var i = 0; i < x; i++) {
        console.log("Elo żelo");
    }
}
var nowButJustMinutes = new Date().getMinutes();
eloZelo(nowButJustMinutes);
