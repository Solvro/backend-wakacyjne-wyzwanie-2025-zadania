"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_import_nodes_1 = require("../get-import-nodes");
var get_import_nodes_matched_group_1 = require("../get-import-nodes-matched-group");
var code = "// first comment\n// second comment\nimport z from '@server/z';\nimport c from '@server/c';\nimport g from '@ui/g';\nimport t from '@core/t';\nimport k from 'k';\nimport j from './j';\nimport l from './l';\nimport a from '@core/a';\n";
test('should return correct matched groups', function () {
    var importNodes = (0, get_import_nodes_1.getImportNodes)(code);
    var importOrder = [
        '^@server/(.*)$',
        '^@core/(.*)$',
        '^@ui/(.*)$',
        '^[./]',
    ];
    var matchedGroups = [];
    for (var _i = 0, importNodes_1 = importNodes; _i < importNodes_1.length; _i++) {
        var importNode = importNodes_1[_i];
        var matchedGroup = (0, get_import_nodes_matched_group_1.getImportNodesMatchedGroup)(importNode, importOrder);
        matchedGroups.push(matchedGroup);
    }
    expect(matchedGroups).toEqual([
        '^@server/(.*)$',
        '^@server/(.*)$',
        '^@ui/(.*)$',
        '^@core/(.*)$',
        '<THIRD_PARTY_MODULES>',
        '^[./]',
        '^[./]',
        '^@core/(.*)$',
    ]);
});
test('should return type imports as part of a matching group if no type-specific group is present', function () {
    var code = "\nimport type { ExternalType } from 'external-type-module';\nimport type { InternalType } from './internal-type-module';\nimport { externalFn } from 'external-fn-module';\nimport { internalFn } from './internal-fn-module';\n    ";
    var importNodes = (0, get_import_nodes_1.getImportNodes)(code, {
        plugins: ['typescript'],
    });
    var importOrder = [
        '^[^.].*',
        '^[.].*',
    ];
    var matchedGroups = [];
    for (var _i = 0, importNodes_2 = importNodes; _i < importNodes_2.length; _i++) {
        var importNode = importNodes_2[_i];
        var matchedGroup = (0, get_import_nodes_matched_group_1.getImportNodesMatchedGroup)(importNode, importOrder);
        matchedGroups.push(matchedGroup);
    }
    expect(matchedGroups).toEqual([
        '^[^.].*',
        '^[.].*',
        '^[^.].*',
        '^[.].*',
    ]);
});
test('should return type imports as part of a type-specific group even if a matching non-type specific group precedes it', function () {
    var code = "\nimport type { ExternalType } from 'external-type-module';\nimport type { InternalType } from './internal-type-module';\nimport { externalFn } from 'external-fn-module';\nimport { internalFn } from './internal-fn-module';\n    ";
    var importNodes = (0, get_import_nodes_1.getImportNodes)(code, {
        plugins: ['typescript'],
    });
    var importOrder = [
        '^[^.].*',
        '^[.].*',
        '<TS_TYPES>^[.].*',
    ];
    var matchedGroups = [];
    for (var _i = 0, importNodes_3 = importNodes; _i < importNodes_3.length; _i++) {
        var importNode = importNodes_3[_i];
        var matchedGroup = (0, get_import_nodes_matched_group_1.getImportNodesMatchedGroup)(importNode, importOrder);
        matchedGroups.push(matchedGroup);
    }
    expect(matchedGroups).toEqual([
        '^[^.].*',
        '<TS_TYPES>^[.].*',
        '^[^.].*',
        '^[.].*',
    ]);
});
test('should return THIRD_PARTY_MODULES as matched group with empty order list', function () {
    var importNodes = (0, get_import_nodes_1.getImportNodes)(code);
    var importOrder = [];
    for (var _i = 0, importNodes_4 = importNodes; _i < importNodes_4.length; _i++) {
        var importNode = importNodes_4[_i];
        var matchedGroup = (0, get_import_nodes_matched_group_1.getImportNodesMatchedGroup)(importNode, importOrder);
        expect(matchedGroup).toEqual('<THIRD_PARTY_MODULES>');
    }
});
