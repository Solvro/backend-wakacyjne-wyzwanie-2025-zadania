"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPreprocessor = defaultPreprocessor;
var preprocessor_1 = require("./preprocessor");
function defaultPreprocessor(code, options) {
    var _a;
    for (var _i = 0, _b = ['svelte', 'vue']; _i < _b.length; _i++) {
        var extension = _b[_i];
        if ((_a = options.filepath) === null || _a === void 0 ? void 0 : _a.endsWith(".".concat(extension)))
            return code;
    }
    return (0, preprocessor_1.preprocessor)(code, options);
}
