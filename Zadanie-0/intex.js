"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function eloZelo(repeats) {
    var content = "Elo żelo\n".repeat(repeats);
    (0, fs_1.writeFileSync)("elo-żelo.txt", content, {
        flag: "w"
    });
}
var minutesNow = new Date().getMinutes();
eloZelo(minutesNow);
