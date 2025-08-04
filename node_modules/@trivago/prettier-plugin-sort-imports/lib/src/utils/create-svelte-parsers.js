"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSvelteParsers = createSvelteParsers;
function createSvelteParsers() {
    try {
        var parsers = require('prettier-plugin-svelte').parsers;
    }
    catch (_a) {
        return {};
    }
    return { parsers: parsers };
}
