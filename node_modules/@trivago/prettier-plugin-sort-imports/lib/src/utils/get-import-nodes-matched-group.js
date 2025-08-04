"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportNodesMatchedGroup = void 0;
var constants_1 = require("../constants");
/**
 * Get the regexp group to keep the import nodes.
 * @param node
 * @param importOrder
 */
var getImportNodesMatchedGroup = function (node, importOrder) {
    var groupWithRegExp = importOrder.map(function (group) { return ({
        group: group,
        regExp: group.startsWith(constants_1.TYPES_SPECIAL_WORD)
            ? new RegExp(group.replace(constants_1.TYPES_SPECIAL_WORD, ''))
            : new RegExp(group),
    }); });
    // finding the group for non-type imports is easy: it's the first group that matches.
    // however, for type imports, we need to make sure that we don't match a non-type group
    // that's earlier in the list than a type-specific group that would otherwise match.
    // so we need to get all matching groups, look for the first matching _type-specific_ group,
    // and if it exists, return it. otherwise, return the first matching group if there is one.
    var matchingGroups = groupWithRegExp.filter(function (_a) {
        var group = _a.group, regExp = _a.regExp;
        if (group.startsWith(constants_1.TYPES_SPECIAL_WORD) &&
            node.importKind !== 'type') {
            return false;
        }
        else {
            return node.source.value.match(regExp) !== null;
        }
    });
    if (matchingGroups.length === 0) {
        return node.importKind === 'type' &&
            importOrder.find(function (group) { return group === constants_1.THIRD_PARTY_TYPES_SPECIAL_WORD; })
            ? constants_1.THIRD_PARTY_TYPES_SPECIAL_WORD
            : constants_1.THIRD_PARTY_MODULES_SPECIAL_WORD;
    }
    else if (node.importKind !== 'type') {
        return matchingGroups[0].group;
    }
    else {
        for (var _i = 0, matchingGroups_1 = matchingGroups; _i < matchingGroups_1.length; _i++) {
            var group = matchingGroups_1[_i].group;
            if (group.startsWith(constants_1.TYPES_SPECIAL_WORD))
                return group;
        }
        return matchingGroups[0].group;
    }
};
exports.getImportNodesMatchedGroup = getImportNodesMatchedGroup;
