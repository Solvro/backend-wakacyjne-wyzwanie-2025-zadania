"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vuePreprocessor = vuePreprocessor;
var preprocessor_1 = require("./preprocessor");
function vuePreprocessor(code, options) {
    var _a, _b;
    var parse = require('@vue/compiler-sfc').parse;
    var descriptor = parse(code).descriptor;
    var scriptContent = (_a = descriptor.script) === null || _a === void 0 ? void 0 : _a.content;
    var scriptSetupContent = (_b = descriptor.scriptSetup) === null || _b === void 0 ? void 0 : _b.content;
    if (!scriptContent && !scriptSetupContent) {
        return code;
    }
    var transformedCode = code;
    var replacer = function (content) {
        // we pass the second argument as a function to avoid issues with the replacement string
        // if string contained special groups (like $&, $`, $', $n, $<n>, etc.) this would produce invalid results
        return transformedCode.replace(content, function () { return "\n".concat((0, preprocessor_1.preprocessor)(content, options), "\n"); });
    };
    if (scriptContent) {
        transformedCode = replacer(scriptContent);
    }
    if (scriptSetupContent) {
        transformedCode = replacer(scriptSetupContent);
    }
    return transformedCode;
}
