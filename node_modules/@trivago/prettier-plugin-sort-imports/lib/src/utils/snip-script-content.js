"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snipScriptAndStyleTagContent = snipScriptAndStyleTagContent;
var snippedTagContentAttribute = '✂prettier:content✂';
var scriptRegex = /<!--[^]*?-->|<script((?:\s+[^=>'"\/\s]+=(?:"[^"]*"|'[^']*'|[^>\s]+)|\s+[^=>'"\/\s]+)*\s*)>([^]*?)<\/script>/g;
var styleRegex = /<!--[^]*?-->|<style((?:\s+[^=>'"\/\s]+=(?:"[^"]*"|'[^']*'|[^>\s]+)|\s+[^=>'"\/\s]+)*\s*)>([^]*?)<\/style>/g;
var langTsRegex = /\slang=["']?ts["']?/;
var stringToBase64 = typeof Buffer !== 'undefined'
    ? function (str) { return Buffer.from(str).toString('base64'); }
    : function (str) {
        return btoa(new TextEncoder()
            .encode(str)
            .reduce(function (acc, byte) { return acc + String.fromCharCode(byte); }, ''));
    };
function snipScriptAndStyleTagContent(source) {
    var scriptMatchSpans = getMatchIndexes('script');
    var styleMatchSpans = getMatchIndexes('style');
    var isTypescript = false;
    var text = snipTagContent(snipTagContent(source, 'script', '{}', styleMatchSpans), 'style', '', scriptMatchSpans);
    return { text: text, isTypescript: isTypescript };
    function getMatchIndexes(tagName) {
        var regex = getRegexp(tagName);
        var indexes = [];
        var match = null;
        while ((match = regex.exec(source)) != null) {
            if (source.slice(match.index, match.index + 4) !== '<!--') {
                indexes.push([match.index, regex.lastIndex]);
            }
        }
        return indexes;
    }
    function snipTagContent(_source, tagName, placeholder, otherSpans) {
        var regex = getRegexp(tagName);
        var newScriptMatchSpans = scriptMatchSpans;
        var newStyleMatchSpans = styleMatchSpans;
        // Replace valid matches
        var newSource = _source.replace(regex, function (match, attributes, content, index) {
            if (match.startsWith('<!--') || withinOtherSpan(index)) {
                return match;
            }
            if (langTsRegex.test(attributes)) {
                isTypescript = true;
            }
            var encodedContent = stringToBase64(content);
            var newContent = "<".concat(tagName).concat(attributes, " ").concat(snippedTagContentAttribute, "=\"").concat(encodedContent, "\">").concat(placeholder, "</").concat(tagName, ">");
            // Adjust the spans because the source now has a different content length
            var lengthDiff = match.length - newContent.length;
            newScriptMatchSpans = adjustSpans(scriptMatchSpans, newScriptMatchSpans);
            newStyleMatchSpans = adjustSpans(styleMatchSpans, newStyleMatchSpans);
            function adjustSpans(oldSpans, newSpans) {
                return oldSpans.map(function (oldSpan, idx) {
                    var newSpan = newSpans[idx];
                    // Do the check using the old spans because the replace function works
                    // on the old spans. Replace oldSpans with newSpans afterwards.
                    if (oldSpan[0] > index) {
                        // span is after the match -> adjust start and end
                        return [newSpan[0] - lengthDiff, newSpan[1] - lengthDiff];
                    }
                    else if (oldSpan[0] === index) {
                        // span is the match -> adjust end only
                        return [newSpan[0], newSpan[1] - lengthDiff];
                    }
                    else {
                        // span is before the match -> nothing to adjust
                        return newSpan;
                    }
                });
            }
            return newContent;
        });
        // Now that the replacement function ran, we can adjust the spans for the next run
        scriptMatchSpans = newScriptMatchSpans;
        styleMatchSpans = newStyleMatchSpans;
        return newSource;
        function withinOtherSpan(idx) {
            return otherSpans.some(function (otherSpan) { return idx > otherSpan[0] && idx < otherSpan[1]; });
        }
    }
    function getRegexp(tagName) {
        return tagName === 'script' ? scriptRegex : styleRegex;
    }
}
