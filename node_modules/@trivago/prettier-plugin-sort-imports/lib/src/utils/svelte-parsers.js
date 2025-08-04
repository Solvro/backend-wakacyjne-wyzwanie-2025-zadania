"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.svelteParsers = void 0;
var compiler_1 = require("svelte/compiler");
var snip_script_content_1 = require("./snip-script-content");
function locStart(node) {
    return node.start;
}
function locEnd(node) {
    return node.end;
}
function hasPragma(text) {
    return /^\s*<!--\s*@(format|prettier)\W/.test(text);
}
exports.svelteParsers = {
    svelte: {
        hasPragma: hasPragma,
        parse: function (text) {
            try {
                return __assign(__assign({}, (0, compiler_1.parse)(text)), { __isRoot: true });
            }
            catch (err) {
                if (err.start != null && err.end != null) {
                    // Prettier expects error objects to have loc.start and loc.end fields.
                    // Svelte uses start and end directly on the error.
                    err.loc = {
                        start: err.start,
                        end: err.end,
                    };
                }
                throw err;
            }
        },
        preprocess: function (text, options) {
            var result = (0, snip_script_content_1.snipScriptAndStyleTagContent)(text);
            text = result.text.trim();
            // Prettier sets the preprocessed text as the originalText in case
            // the Svelte formatter is called directly. In case it's called
            // as an embedded parser (for example when there's a Svelte code block
            // inside markdown), the originalText is not updated after preprocessing.
            // Therefore we do it ourselves here.
            options.originalText = text;
            options._svelte_ts = result.isTypescript;
            return text;
        },
        locStart: locStart,
        locEnd: locEnd,
        astFormat: 'svelte-ast',
    },
};
