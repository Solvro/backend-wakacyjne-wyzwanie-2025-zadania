"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedNodes = void 0;
var constants_1 = require("../constants");
var adjust_comments_on_sorted_nodes_1 = require("./adjust-comments-on-sorted-nodes");
var get_sorted_nodes_by_import_order_1 = require("./get-sorted-nodes-by-import-order");
/**
 * This function returns the given nodes, sorted in the order as indicated by
 * the importOrder array. The plugin considers these import nodes as local
 * import declarations
 *
 * In addition, this method preserves the relative order of side effect imports
 * and non side effect imports. A side effect import is an ImportDeclaration
 * without any import specifiers. It does this by splitting the import nodes at
 * each side effect node, then sorting only the non side effect import nodes
 * between the side effect nodes according to the given options.
 * @param nodes All import nodes that should be sorted.
 * @param options Options to influence the behavior of the sorting algorithm.
 */
var getSortedNodes = function (nodes, options) {
    var importOrderSeparation = options.importOrderSeparation, importOrderSideEffects = options.importOrderSideEffects;
    // Split nodes at each boundary between a side-effect node and a
    // non-side-effect node, keeping both types of nodes together.
    var splitBySideEffectNodes = nodes.reduce(function (chunks, node) {
        var isChunkEffectNode = node.specifiers.length === 0 &&
            importOrderSideEffects === false;
        var type = isChunkEffectNode
            ? constants_1.chunkSideEffectNode
            : constants_1.chunkSideOtherNode;
        var last = chunks[chunks.length - 1];
        if (last === undefined || last.type !== type) {
            chunks.push({ type: type, nodes: [node] });
        }
        else {
            last.nodes.push(node);
        }
        return chunks;
    }, []);
    var finalNodes = [];
    // Sort each chunk of side-effect and non-side-effect nodes, and insert new
    // lines according the importOrderSeparation option.
    for (var _i = 0, splitBySideEffectNodes_1 = splitBySideEffectNodes; _i < splitBySideEffectNodes_1.length; _i++) {
        var chunk = splitBySideEffectNodes_1[_i];
        if (chunk.type === constants_1.chunkSideEffectNode) {
            // do not sort side effect nodes
            finalNodes.push.apply(finalNodes, chunk.nodes);
        }
        else {
            // sort non-side effect nodes
            var sorted = (0, get_sorted_nodes_by_import_order_1.getSortedNodesByImportOrder)(chunk.nodes, options);
            finalNodes.push.apply(finalNodes, sorted);
        }
        if (importOrderSeparation) {
            finalNodes.push(constants_1.newLineNode);
        }
    }
    if (finalNodes.length > 0 && !importOrderSeparation) {
        finalNodes.push(constants_1.newLineNode);
    }
    // Adjust the comments on the sorted nodes to match the original comments
    (0, adjust_comments_on_sorted_nodes_1.adjustCommentsOnSortedNodes)(nodes, finalNodes);
    return finalNodes;
};
exports.getSortedNodes = getSortedNodes;
