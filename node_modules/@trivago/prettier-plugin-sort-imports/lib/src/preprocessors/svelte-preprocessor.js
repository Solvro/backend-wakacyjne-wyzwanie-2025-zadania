"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sveltePreprocessor = sveltePreprocessor;
var preprocessor_1 = require("./preprocessor");
var booleanGuard = function (value) { return Boolean(value); };
var sortImports = function (code, options) {
    var parse = require('svelte/compiler').parse;
    var _a = parse(code), instance = _a.instance, module = _a.module;
    var sources = [instance, module].filter(booleanGuard);
    if (!sources.length)
        return code;
    return sources.reduce(function (code, source) {
        var snippet = code.slice(source.content.start, source.content.end);
        var preprocessed = (0, preprocessor_1.preprocessor)(snippet, options);
        var result = code.replace(snippet, "\n".concat(preprocessed, "\n"));
        return result;
    }, code);
};
function sveltePreprocessor(code, options) {
    var sorted = sortImports(code, options);
    var prettierPluginSvelte = require('prettier-plugin-svelte');
    return prettierPluginSvelte.parsers.svelte.preprocess(sorted, options);
}
