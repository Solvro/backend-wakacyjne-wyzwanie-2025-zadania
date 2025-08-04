"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name8 in all)
    __defProp(target, name8, { get: all[name8], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/rules.ts
var rules_exports = {};
__export(rules_exports, {
  rules: () => rules
});
module.exports = __toCommonJS(rules_exports);

// src/rules/exhaustive-deps/exhaustive-deps.rule.ts
var import_utils4 = require("@typescript-eslint/utils");

// src/utils/ast-utils.ts
var import_utils = require("@typescript-eslint/utils");

// src/utils/unique-by.ts
function uniqueBy(arr, fn) {
  return arr.filter((x, i, a) => a.findIndex((y) => fn(x) === fn(y)) === i);
}

// src/utils/ast-utils.ts
var ASTUtils = {
  isNodeOfOneOf(node, types) {
    return types.includes(node.type);
  },
  isIdentifier(node) {
    return node.type === import_utils.AST_NODE_TYPES.Identifier;
  },
  isIdentifierWithName(node, name8) {
    return ASTUtils.isIdentifier(node) && node.name === name8;
  },
  isIdentifierWithOneOfNames(node, name8) {
    return ASTUtils.isIdentifier(node) && name8.includes(node.name);
  },
  isProperty(node) {
    return node.type === import_utils.AST_NODE_TYPES.Property;
  },
  isObjectExpression(node) {
    return node.type === import_utils.AST_NODE_TYPES.ObjectExpression;
  },
  isPropertyWithIdentifierKey(node, key) {
    return ASTUtils.isProperty(node) && ASTUtils.isIdentifierWithName(node.key, key);
  },
  findPropertyWithIdentifierKey(properties, key) {
    return properties.find(
      (x) => ASTUtils.isPropertyWithIdentifierKey(x, key)
    );
  },
  getNestedIdentifiers(node) {
    const identifiers = [];
    if (ASTUtils.isIdentifier(node)) {
      identifiers.push(node);
    }
    if ("arguments" in node) {
      node.arguments.forEach((x) => {
        identifiers.push(...ASTUtils.getNestedIdentifiers(x));
      });
    }
    if ("elements" in node) {
      node.elements.forEach((x) => {
        if (x !== null) {
          identifiers.push(...ASTUtils.getNestedIdentifiers(x));
        }
      });
    }
    if ("properties" in node) {
      node.properties.forEach((x) => {
        identifiers.push(...ASTUtils.getNestedIdentifiers(x));
      });
    }
    if ("expressions" in node) {
      node.expressions.forEach((x) => {
        identifiers.push(...ASTUtils.getNestedIdentifiers(x));
      });
    }
    if ("left" in node) {
      identifiers.push(...ASTUtils.getNestedIdentifiers(node.left));
    }
    if ("right" in node) {
      identifiers.push(...ASTUtils.getNestedIdentifiers(node.right));
    }
    if (node.type === import_utils.AST_NODE_TYPES.Property) {
      identifiers.push(...ASTUtils.getNestedIdentifiers(node.value));
    }
    if (node.type === import_utils.AST_NODE_TYPES.SpreadElement) {
      identifiers.push(...ASTUtils.getNestedIdentifiers(node.argument));
    }
    if (node.type === import_utils.AST_NODE_TYPES.MemberExpression) {
      identifiers.push(...ASTUtils.getNestedIdentifiers(node.object));
    }
    if (node.type === import_utils.AST_NODE_TYPES.UnaryExpression) {
      identifiers.push(...ASTUtils.getNestedIdentifiers(node.argument));
    }
    if (node.type === import_utils.AST_NODE_TYPES.ChainExpression) {
      identifiers.push(...ASTUtils.getNestedIdentifiers(node.expression));
    }
    if (node.type === import_utils.AST_NODE_TYPES.TSNonNullExpression) {
      identifiers.push(...ASTUtils.getNestedIdentifiers(node.expression));
    }
    if (node.type === import_utils.AST_NODE_TYPES.ArrowFunctionExpression) {
      identifiers.push(...ASTUtils.getNestedIdentifiers(node.body));
    }
    if (node.type === import_utils.AST_NODE_TYPES.FunctionExpression) {
      identifiers.push(...ASTUtils.getNestedIdentifiers(node.body));
    }
    if (node.type === import_utils.AST_NODE_TYPES.BlockStatement) {
      identifiers.push(
        ...node.body.map((body) => ASTUtils.getNestedIdentifiers(body)).flat()
      );
    }
    if (node.type === import_utils.AST_NODE_TYPES.ReturnStatement && node.argument) {
      identifiers.push(...ASTUtils.getNestedIdentifiers(node.argument));
    }
    return identifiers;
  },
  isAncestorIsCallee(identifier) {
    let previousNode = identifier;
    let currentNode = identifier.parent;
    while (currentNode !== void 0) {
      if (currentNode.type === import_utils.AST_NODE_TYPES.CallExpression && currentNode.callee === previousNode) {
        return true;
      }
      if (currentNode.type !== import_utils.AST_NODE_TYPES.MemberExpression) {
        return false;
      }
      previousNode = currentNode;
      currentNode = currentNode.parent;
    }
    return false;
  },
  traverseUpOnly(identifier, allowedNodeTypes) {
    const parent = identifier.parent;
    if (parent !== void 0 && allowedNodeTypes.includes(parent.type)) {
      return ASTUtils.traverseUpOnly(parent, allowedNodeTypes);
    }
    return identifier;
  },
  isDeclaredInNode(params) {
    const { functionNode, reference, scopeManager } = params;
    const scope = scopeManager.acquire(functionNode);
    if (scope === null) {
      return false;
    }
    return scope.set.has(reference.identifier.name);
  },
  getExternalRefs(params) {
    const { scopeManager, sourceCode, node } = params;
    const scope = scopeManager.acquire(node);
    if (scope === null) {
      return [];
    }
    const references = scope.references.filter((x) => x.isRead() && !scope.set.has(x.identifier.name)).map((x) => {
      const referenceNode = ASTUtils.traverseUpOnly(x.identifier, [
        import_utils.AST_NODE_TYPES.MemberExpression,
        import_utils.AST_NODE_TYPES.Identifier
      ]);
      return {
        variable: x,
        node: referenceNode,
        text: sourceCode.getText(referenceNode)
      };
    });
    const localRefIds = new Set(
      [...scope.set.values()].map((x) => sourceCode.getText(x.identifiers[0]))
    );
    const externalRefs = references.filter(
      (x) => x.variable.resolved === null || !localRefIds.has(x.text)
    );
    return uniqueBy(externalRefs, (x) => x.text).map((x) => x.variable);
  },
  mapKeyNodeToText(node, sourceCode) {
    return sourceCode.getText(
      ASTUtils.traverseUpOnly(node, [
        import_utils.AST_NODE_TYPES.MemberExpression,
        import_utils.AST_NODE_TYPES.TSNonNullExpression,
        import_utils.AST_NODE_TYPES.Identifier
      ])
    );
  },
  mapKeyNodeToBaseText(node, sourceCode) {
    return ASTUtils.mapKeyNodeToText(node, sourceCode).replace(
      /(?:\?(\.)|!)/g,
      "$1"
    );
  },
  isValidReactComponentOrHookName(identifier) {
    return identifier !== null && identifier !== void 0 && /^(use|[A-Z])/.test(identifier.name);
  },
  getFunctionAncestor(sourceCode, node) {
    for (const ancestor of sourceCode.getAncestors(node)) {
      if (ASTUtils.isNodeOfOneOf(ancestor, [
        import_utils.AST_NODE_TYPES.FunctionDeclaration,
        import_utils.AST_NODE_TYPES.FunctionExpression,
        import_utils.AST_NODE_TYPES.ArrowFunctionExpression
      ])) {
        return ancestor;
      }
      if (ancestor.parent?.type === import_utils.AST_NODE_TYPES.VariableDeclarator && ancestor.parent.id.type === import_utils.AST_NODE_TYPES.Identifier && ASTUtils.isNodeOfOneOf(ancestor, [
        import_utils.AST_NODE_TYPES.FunctionDeclaration,
        import_utils.AST_NODE_TYPES.FunctionExpression,
        import_utils.AST_NODE_TYPES.ArrowFunctionExpression
      ])) {
        return ancestor;
      }
    }
    return void 0;
  },
  getReferencedExpressionByIdentifier(params) {
    const { node, context } = params;
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    const scope = context.sourceCode.getScope(node) ? sourceCode.getScope(node) : context.getScope();
    const resolvedNode = scope.references.find((ref) => ref.identifier === node)?.resolved?.defs[0]?.node;
    if (resolvedNode?.type !== import_utils.AST_NODE_TYPES.VariableDeclarator) {
      return null;
    }
    return resolvedNode.init;
  },
  getClosestVariableDeclarator(node) {
    let currentNode = node;
    while (currentNode.type !== import_utils.AST_NODE_TYPES.Program) {
      if (currentNode.type === import_utils.AST_NODE_TYPES.VariableDeclarator) {
        return currentNode;
      }
      currentNode = currentNode.parent;
    }
    return void 0;
  },
  getNestedReturnStatements(node) {
    const returnStatements = [];
    if (node.type === import_utils.AST_NODE_TYPES.ReturnStatement) {
      returnStatements.push(node);
    }
    if ("body" in node && node.body !== void 0 && node.body !== null) {
      Array.isArray(node.body) ? node.body.forEach((x) => {
        returnStatements.push(...ASTUtils.getNestedReturnStatements(x));
      }) : returnStatements.push(
        ...ASTUtils.getNestedReturnStatements(node.body)
      );
    }
    if ("consequent" in node) {
      Array.isArray(node.consequent) ? node.consequent.forEach((x) => {
        returnStatements.push(...ASTUtils.getNestedReturnStatements(x));
      }) : returnStatements.push(
        ...ASTUtils.getNestedReturnStatements(node.consequent)
      );
    }
    if ("alternate" in node && node.alternate !== null) {
      Array.isArray(node.alternate) ? node.alternate.forEach((x) => {
        returnStatements.push(...ASTUtils.getNestedReturnStatements(x));
      }) : returnStatements.push(
        ...ASTUtils.getNestedReturnStatements(node.alternate)
      );
    }
    if ("cases" in node) {
      node.cases.forEach((x) => {
        returnStatements.push(...ASTUtils.getNestedReturnStatements(x));
      });
    }
    if ("block" in node) {
      returnStatements.push(...ASTUtils.getNestedReturnStatements(node.block));
    }
    if ("handler" in node && node.handler !== null) {
      returnStatements.push(...ASTUtils.getNestedReturnStatements(node.handler));
    }
    if ("finalizer" in node && node.finalizer !== null) {
      returnStatements.push(
        ...ASTUtils.getNestedReturnStatements(node.finalizer)
      );
    }
    if ("expression" in node && node.expression !== true && node.expression !== false) {
      returnStatements.push(
        ...ASTUtils.getNestedReturnStatements(node.expression)
      );
    }
    if ("test" in node && node.test !== null) {
      returnStatements.push(...ASTUtils.getNestedReturnStatements(node.test));
    }
    return returnStatements;
  }
};

// src/utils/get-docs-url.ts
var getDocsUrl = (ruleName) => `https://tanstack.com/query/latest/docs/eslint/${ruleName}`;

// src/utils/detect-react-query-imports.ts
var import_utils2 = require("@typescript-eslint/utils");
function detectTanstackQueryImports(create) {
  return (context, optionsWithDefault) => {
    const tanstackQueryImportSpecifiers = [];
    const helpers = {
      isSpecificTanstackQueryImport(node, source) {
        return !!tanstackQueryImportSpecifiers.find((specifier) => {
          if (specifier.type === import_utils2.TSESTree.AST_NODE_TYPES.ImportSpecifier && specifier.parent.type === import_utils2.TSESTree.AST_NODE_TYPES.ImportDeclaration && specifier.parent.source.value === source) {
            return node.name === specifier.local.name;
          }
          return false;
        });
      },
      isTanstackQueryImport(node) {
        return !!tanstackQueryImportSpecifiers.find((specifier) => {
          if (specifier.type === import_utils2.TSESTree.AST_NODE_TYPES.ImportSpecifier) {
            return node.name === specifier.local.name;
          }
          return false;
        });
      }
    };
    const detectionInstructions = {
      ImportDeclaration(node) {
        if (node.specifiers.length > 0 && // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        (node.importKind === "value" || node.importKind === void 0) && node.source.value.startsWith("@tanstack/") && node.source.value.endsWith("-query")) {
          tanstackQueryImportSpecifiers.push(...node.specifiers);
        }
      }
    };
    const ruleInstructions = create(context, optionsWithDefault, helpers);
    const enhancedRuleInstructions = {};
    const allKeys = new Set(
      Object.keys(detectionInstructions).concat(Object.keys(ruleInstructions))
    );
    allKeys.forEach((instruction) => {
      enhancedRuleInstructions[instruction] = (node) => {
        if (instruction in detectionInstructions) {
          detectionInstructions[instruction]?.(node);
        }
        const ruleInstruction = ruleInstructions[instruction];
        if (ruleInstruction) {
          return ruleInstruction(node);
        }
        return void 0;
      };
    });
    return enhancedRuleInstructions;
  };
}

// src/rules/exhaustive-deps/exhaustive-deps.utils.ts
var import_utils3 = require("@typescript-eslint/utils");
var ExhaustiveDepsUtils = {
  isRelevantReference(params) {
    const { sourceCode, reference, scopeManager, node } = params;
    const component = ASTUtils.getFunctionAncestor(sourceCode, node);
    if (component === void 0) {
      return false;
    }
    if (!ASTUtils.isDeclaredInNode({
      scopeManager,
      reference,
      functionNode: component
    })) {
      return false;
    }
    return reference.identifier.name !== "undefined" && reference.identifier.parent.type !== import_utils3.AST_NODE_TYPES.NewExpression && !ExhaustiveDepsUtils.isInstanceOfKind(reference.identifier.parent);
  },
  isInstanceOfKind(node) {
    return node.type === import_utils3.AST_NODE_TYPES.BinaryExpression && node.operator === "instanceof";
  }
};

// src/rules/exhaustive-deps/exhaustive-deps.rule.ts
var QUERY_KEY = "queryKey";
var QUERY_FN = "queryFn";
var name = "exhaustive-deps";
var createRule = import_utils4.ESLintUtils.RuleCreator(getDocsUrl);
var rule = createRule({
  name,
  meta: {
    type: "problem",
    docs: {
      description: "Exhaustive deps rule for useQuery",
      recommended: "error"
    },
    messages: {
      missingDeps: `The following dependencies are missing in your queryKey: {{deps}}`,
      fixTo: "Fix to {{result}}"
    },
    hasSuggestions: true,
    fixable: "code",
    schema: []
  },
  defaultOptions: [],
  create: detectTanstackQueryImports((context) => {
    return {
      Property: (node) => {
        if (!ASTUtils.isObjectExpression(node.parent) || !ASTUtils.isIdentifierWithName(node.key, QUERY_KEY)) {
          return;
        }
        const scopeManager = context.sourceCode.scopeManager;
        const queryKey = ASTUtils.findPropertyWithIdentifierKey(
          node.parent.properties,
          QUERY_KEY
        );
        const queryFn = ASTUtils.findPropertyWithIdentifierKey(
          node.parent.properties,
          QUERY_FN
        );
        if (scopeManager === null || queryKey === void 0 || queryFn === void 0 || !ASTUtils.isNodeOfOneOf(queryFn.value, [
          import_utils4.AST_NODE_TYPES.ArrowFunctionExpression,
          import_utils4.AST_NODE_TYPES.FunctionExpression,
          import_utils4.AST_NODE_TYPES.ConditionalExpression
        ])) {
          return;
        }
        let queryKeyNode = queryKey.value;
        if (queryKeyNode.type === import_utils4.AST_NODE_TYPES.TSAsExpression && queryKeyNode.expression.type === import_utils4.AST_NODE_TYPES.ArrayExpression) {
          queryKeyNode = queryKeyNode.expression;
        }
        if (queryKeyNode.type === import_utils4.AST_NODE_TYPES.Identifier) {
          const expression = ASTUtils.getReferencedExpressionByIdentifier({
            context,
            node: queryKeyNode
          });
          if (expression?.type === import_utils4.AST_NODE_TYPES.ArrayExpression) {
            queryKeyNode = expression;
          }
        }
        const externalRefs = ASTUtils.getExternalRefs({
          scopeManager,
          sourceCode: context.sourceCode,
          node: getQueryFnRelevantNode(queryFn)
        });
        const relevantRefs = externalRefs.filter(
          (reference) => ExhaustiveDepsUtils.isRelevantReference({
            sourceCode: context.sourceCode,
            reference,
            scopeManager,
            node: getQueryFnRelevantNode(queryFn)
          })
        );
        const existingKeys = ASTUtils.getNestedIdentifiers(queryKeyNode).map(
          (identifier) => ASTUtils.mapKeyNodeToBaseText(identifier, context.sourceCode)
        );
        const missingRefs = relevantRefs.map((ref) => ({
          ref,
          text: ASTUtils.mapKeyNodeToBaseText(
            ref.identifier,
            context.sourceCode
          )
        })).filter(({ ref, text }) => {
          return !ref.isTypeReference && !ASTUtils.isAncestorIsCallee(ref.identifier) && !existingKeys.some((existingKey) => existingKey === text) && !existingKeys.includes(text.split(/[?.]/)[0] ?? "");
        }).map(({ ref, text }) => ({
          identifier: ref.identifier,
          text
        }));
        const uniqueMissingRefs = uniqueBy(missingRefs, (x) => x.text);
        if (uniqueMissingRefs.length > 0) {
          const missingAsText = uniqueMissingRefs.map(
            (ref) => ASTUtils.mapKeyNodeToText(ref.identifier, context.sourceCode)
          ).join(", ");
          const queryKeyValue = context.sourceCode.getText(queryKeyNode);
          const existingWithMissing = queryKeyValue === "[]" ? `[${missingAsText}]` : queryKeyValue.replace(/\]$/, `, ${missingAsText}]`);
          const suggestions = [];
          if (queryKeyNode.type === import_utils4.AST_NODE_TYPES.ArrayExpression) {
            suggestions.push({
              messageId: "fixTo",
              data: { result: existingWithMissing },
              fix(fixer) {
                return fixer.replaceText(queryKeyNode, existingWithMissing);
              }
            });
          }
          context.report({
            node,
            messageId: "missingDeps",
            data: {
              deps: uniqueMissingRefs.map((ref) => ref.text).join(", ")
            },
            suggest: suggestions
          });
        }
      }
    };
  })
});
function getQueryFnRelevantNode(queryFn) {
  if (queryFn.value.type !== import_utils4.AST_NODE_TYPES.ConditionalExpression) {
    return queryFn.value;
  }
  if (queryFn.value.consequent.type === import_utils4.AST_NODE_TYPES.Identifier && queryFn.value.consequent.name === "skipToken") {
    return queryFn.value.alternate;
  }
  return queryFn.value.consequent;
}

// src/rules/stable-query-client/stable-query-client.rule.ts
var import_utils5 = require("@typescript-eslint/utils");
var name2 = "stable-query-client";
var createRule2 = import_utils5.ESLintUtils.RuleCreator(getDocsUrl);
var rule2 = createRule2({
  name: name2,
  meta: {
    type: "problem",
    docs: {
      description: "Makes sure that QueryClient is stable",
      recommended: "error"
    },
    messages: {
      unstable: [
        "QueryClient is not stable. It should be either extracted from the component or wrapped in React.useState.",
        "See https://tkdodo.eu/blog/react-query-fa-qs#2-the-queryclient-is-not-stable"
      ].join("\n"),
      fixTo: "Fix to {{result}}"
    },
    hasSuggestions: true,
    fixable: "code",
    schema: []
  },
  defaultOptions: [],
  create: detectTanstackQueryImports((context, _, helpers) => {
    return {
      NewExpression: (node) => {
        if (node.callee.type !== import_utils5.AST_NODE_TYPES.Identifier || node.callee.name !== "QueryClient" || node.parent.type !== import_utils5.AST_NODE_TYPES.VariableDeclarator || !helpers.isSpecificTanstackQueryImport(
          node.callee,
          "@tanstack/react-query"
        )) {
          return;
        }
        const fnAncestor = ASTUtils.getFunctionAncestor(
          context.sourceCode,
          node
        );
        const isReactServerComponent = fnAncestor?.async === true;
        if (!ASTUtils.isValidReactComponentOrHookName(fnAncestor?.id) || isReactServerComponent) {
          return;
        }
        context.report({
          node: node.parent,
          messageId: "unstable",
          fix: (() => {
            const { parent } = node;
            if (parent.id.type !== import_utils5.AST_NODE_TYPES.Identifier) {
              return;
            }
            const sourceCode = context.sourceCode ?? context.getSourceCode();
            const nodeText = sourceCode.getText(node);
            const variableName = parent.id.name;
            return (fixer) => {
              return fixer.replaceTextRange(
                [parent.range[0], parent.range[1]],
                `[${variableName}] = React.useState(() => ${nodeText})`
              );
            };
          })()
        });
      }
    };
  })
});

// src/rules/no-rest-destructuring/no-rest-destructuring.rule.ts
var import_utils7 = require("@typescript-eslint/utils");

// src/rules/no-rest-destructuring/no-rest-destructuring.utils.ts
var import_utils6 = require("@typescript-eslint/utils");
var NoRestDestructuringUtils = {
  isObjectRestDestructuring(node) {
    if (node.type !== import_utils6.AST_NODE_TYPES.ObjectPattern) {
      return false;
    }
    return node.properties.some((p) => p.type === import_utils6.AST_NODE_TYPES.RestElement);
  }
};

// src/rules/no-rest-destructuring/no-rest-destructuring.rule.ts
var name3 = "no-rest-destructuring";
var queryHooks = [
  "useQuery",
  "useQueries",
  "useInfiniteQuery",
  "useSuspenseQuery",
  "useSuspenseQueries",
  "useSuspenseInfiniteQuery"
];
var createRule3 = import_utils7.ESLintUtils.RuleCreator(getDocsUrl);
var rule3 = createRule3({
  name: name3,
  meta: {
    type: "problem",
    docs: {
      description: "Disallows rest destructuring in queries",
      recommended: "warn"
    },
    messages: {
      objectRestDestructure: `Object rest destructuring on a query will observe all changes to the query, leading to excessive re-renders.`
    },
    schema: []
  },
  defaultOptions: [],
  create: detectTanstackQueryImports((context, _, helpers) => {
    const queryResultVariables = /* @__PURE__ */ new Set();
    return {
      CallExpression: (node) => {
        if (!ASTUtils.isIdentifierWithOneOfNames(node.callee, queryHooks) || node.parent.type !== import_utils7.AST_NODE_TYPES.VariableDeclarator || !helpers.isTanstackQueryImport(node.callee)) {
          return;
        }
        const returnValue = node.parent.id;
        if (node.callee.name !== "useQueries" && node.callee.name !== "useSuspenseQueries") {
          if (NoRestDestructuringUtils.isObjectRestDestructuring(returnValue)) {
            return context.report({
              node: node.parent,
              messageId: "objectRestDestructure"
            });
          }
          if (returnValue.type === import_utils7.AST_NODE_TYPES.Identifier) {
            queryResultVariables.add(returnValue.name);
          }
          return;
        }
        if (returnValue.type !== import_utils7.AST_NODE_TYPES.ArrayPattern) {
          if (returnValue.type === import_utils7.AST_NODE_TYPES.Identifier) {
            queryResultVariables.add(returnValue.name);
          }
          return;
        }
        returnValue.elements.forEach((queryResult) => {
          if (queryResult === null) {
            return;
          }
          if (NoRestDestructuringUtils.isObjectRestDestructuring(queryResult)) {
            context.report({
              node: queryResult,
              messageId: "objectRestDestructure"
            });
          }
        });
      },
      VariableDeclarator: (node) => {
        if (node.init?.type === import_utils7.AST_NODE_TYPES.Identifier && queryResultVariables.has(node.init.name) && NoRestDestructuringUtils.isObjectRestDestructuring(node.id)) {
          context.report({
            node,
            messageId: "objectRestDestructure"
          });
        }
      },
      SpreadElement: (node) => {
        if (node.argument.type === import_utils7.AST_NODE_TYPES.Identifier && queryResultVariables.has(node.argument.name)) {
          context.report({
            node,
            messageId: "objectRestDestructure"
          });
        }
      }
    };
  })
});

// src/rules/no-unstable-deps/no-unstable-deps.rule.ts
var import_utils8 = require("@typescript-eslint/utils");
var name4 = "no-unstable-deps";
var reactHookNames = ["useEffect", "useCallback", "useMemo"];
var useQueryHookNames = [
  "useQuery",
  "useSuspenseQuery",
  "useQueries",
  "useSuspenseQueries",
  "useInfiniteQuery",
  "useSuspenseInfiniteQuery"
];
var allHookNames = ["useMutation", ...useQueryHookNames];
var createRule4 = import_utils8.ESLintUtils.RuleCreator(getDocsUrl);
var rule4 = createRule4({
  name: name4,
  meta: {
    type: "problem",
    docs: {
      description: "Disallow putting the result of query hooks directly in a React hook dependency array",
      recommended: "error"
    },
    messages: {
      noUnstableDeps: `The result of {{queryHook}} is not referentially stable, so don't pass it directly into the dependencies array of {{reactHook}}. Instead, destructure the return value of {{queryHook}} and pass the destructured values into the dependency array of {{reactHook}}.`
    },
    schema: []
  },
  defaultOptions: [],
  create: detectTanstackQueryImports((context) => {
    const trackedVariables = {};
    const hookAliasMap = {};
    function getReactHook(node) {
      if (node.callee.type === "Identifier") {
        const calleeName = node.callee.name;
        if (reactHookNames.includes(calleeName) || calleeName in hookAliasMap) {
          return calleeName;
        }
      } else if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "React" && node.callee.property.type === "Identifier" && reactHookNames.includes(node.callee.property.name)) {
        return node.callee.property.name;
      }
      return void 0;
    }
    function collectVariableNames(pattern, queryHook) {
      if (pattern.type === import_utils8.AST_NODE_TYPES.Identifier) {
        trackedVariables[pattern.name] = queryHook;
      }
    }
    return {
      ImportDeclaration(node) {
        if (node.specifiers.length > 0 && node.importKind === "value" && node.source.value === "React") {
          node.specifiers.forEach((specifier) => {
            if (specifier.type === import_utils8.AST_NODE_TYPES.ImportSpecifier && specifier.imported.type === import_utils8.AST_NODE_TYPES.Identifier && reactHookNames.includes(specifier.imported.name)) {
              hookAliasMap[specifier.local.name] = specifier.imported.name;
            }
          });
        }
      },
      VariableDeclarator(node) {
        if (node.init !== null && node.init.type === import_utils8.AST_NODE_TYPES.CallExpression && node.init.callee.type === import_utils8.AST_NODE_TYPES.Identifier && allHookNames.includes(node.init.callee.name)) {
          collectVariableNames(node.id, node.init.callee.name);
        }
      },
      CallExpression: (node) => {
        const reactHook = getReactHook(node);
        if (reactHook !== void 0 && node.arguments.length > 1 && node.arguments[1]?.type === import_utils8.AST_NODE_TYPES.ArrayExpression) {
          const depsArray = node.arguments[1].elements;
          depsArray.forEach((dep) => {
            if (dep !== null && dep.type === import_utils8.AST_NODE_TYPES.Identifier && trackedVariables[dep.name] !== void 0) {
              const queryHook = trackedVariables[dep.name];
              context.report({
                node: dep,
                messageId: "noUnstableDeps",
                data: {
                  queryHook,
                  reactHook
                }
              });
            }
          });
        }
      }
    };
  })
});

// src/utils/create-property-order-rule.ts
var import_utils9 = require("@typescript-eslint/utils");

// src/utils/sort-data-by-order.ts
function sortDataByOrder(data, orderRules, key) {
  const getSubsetIndex = (item, subsets) => {
    for (let i = 0; i < subsets.length; i++) {
      if (subsets[i]?.includes(item)) {
        return i;
      }
    }
    return null;
  };
  const orderSets = orderRules.reduce(
    (sets, [A, B]) => [...sets, A, B],
    []
  );
  const inOrderArray = data.filter(
    (item) => getSubsetIndex(item[key], orderSets) !== null
  );
  let wasResorted = false;
  const sortedArray = inOrderArray.sort((a, b) => {
    const aKey = a[key], bKey = b[key];
    const aSubsetIndex = getSubsetIndex(aKey, orderSets);
    const bSubsetIndex = getSubsetIndex(bKey, orderSets);
    if (aSubsetIndex !== null && bSubsetIndex !== null && aSubsetIndex !== bSubsetIndex) {
      return aSubsetIndex - bSubsetIndex;
    }
    return 0;
  });
  const inOrderIterator = sortedArray.values();
  const result = data.map((item) => {
    if (getSubsetIndex(item[key], orderSets) !== null) {
      const sortedItem = inOrderIterator.next().value;
      if (sortedItem[key] !== item[key]) {
        wasResorted = true;
      }
      return sortedItem;
    }
    return item;
  });
  if (!wasResorted) {
    return null;
  }
  return result;
}

// src/utils/create-property-order-rule.ts
var createRule5 = import_utils9.ESLintUtils.RuleCreator(getDocsUrl);
function createPropertyOrderRule(options, targetFunctions, orderRules) {
  const targetFunctionSet = new Set(targetFunctions);
  function isTargetFunction(node) {
    return targetFunctionSet.has(node);
  }
  return createRule5({
    ...options,
    create: detectTanstackQueryImports((context) => {
      return {
        CallExpression(node) {
          if (node.callee.type !== import_utils9.AST_NODE_TYPES.Identifier) {
            return;
          }
          const functions = node.callee.name;
          if (!isTargetFunction(functions)) {
            return;
          }
          const argument = node.arguments[0];
          if (argument === void 0 || argument.type !== "ObjectExpression") {
            return;
          }
          const allProperties = argument.properties;
          if (allProperties.length < 2) {
            return;
          }
          const properties = allProperties.flatMap((p, index) => {
            if (p.type === import_utils9.AST_NODE_TYPES.Property && p.key.type === import_utils9.AST_NODE_TYPES.Identifier) {
              return { name: p.key.name, property: p };
            } else return { name: `_property_${index}`, property: p };
          });
          const sortedProperties = sortDataByOrder(
            properties,
            orderRules,
            "name"
          );
          if (sortedProperties === null) {
            return;
          }
          context.report({
            node: argument,
            data: { function: node.callee.name },
            messageId: "invalidOrder",
            fix(fixer) {
              const sourceCode = context.sourceCode;
              const reorderedText = sortedProperties.reduce(
                (sourceText, specifier, index) => {
                  let textBetweenProperties = "";
                  if (index < allProperties.length - 1) {
                    textBetweenProperties = sourceCode.getText().slice(
                      allProperties[index].range[1],
                      allProperties[index + 1].range[0]
                    );
                  }
                  return sourceText + sourceCode.getText(specifier.property) + textBetweenProperties;
                },
                ""
              );
              return fixer.replaceTextRange(
                [allProperties[0].range[0], allProperties.at(-1).range[1]],
                reorderedText
              );
            }
          });
        }
      };
    })
  });
}

// src/rules/infinite-query-property-order/constants.ts
var infiniteQueryFunctions = [
  "infiniteQueryOptions",
  "useInfiniteQuery",
  "useSuspenseInfiniteQuery"
];
var sortRules = [
  [["queryFn"], ["getPreviousPageParam", "getNextPageParam"]]
];

// src/rules/infinite-query-property-order/infinite-query-property-order.rule.ts
var name5 = "infinite-query-property-order";
var rule5 = createPropertyOrderRule(
  {
    name: name5,
    meta: {
      type: "problem",
      docs: {
        description: "Ensure correct order of inference sensitive properties for infinite queries",
        recommended: "error"
      },
      messages: {
        invalidOrder: "Invalid order of properties for `{{function}}`."
      },
      schema: [],
      hasSuggestions: true,
      fixable: "code"
    },
    defaultOptions: []
  },
  infiniteQueryFunctions,
  sortRules
);

// src/rules/no-void-query-fn/no-void-query-fn.rule.ts
var import_utils10 = require("@typescript-eslint/utils");
var import_typescript = __toESM(require("typescript"), 1);
var name6 = "no-void-query-fn";
var createRule6 = import_utils10.ESLintUtils.RuleCreator(getDocsUrl);
var rule6 = createRule6({
  name: name6,
  meta: {
    type: "problem",
    docs: {
      description: "Ensures queryFn returns a non-undefined value",
      recommended: "error"
    },
    messages: {
      noVoidReturn: "queryFn must return a non-undefined value"
    },
    schema: []
  },
  defaultOptions: [],
  create: detectTanstackQueryImports((context) => {
    return {
      Property(node) {
        if (!ASTUtils.isObjectExpression(node.parent) || !ASTUtils.isIdentifierWithName(node.key, "queryFn")) {
          return;
        }
        const parserServices = context.sourceCode.parserServices;
        if (!parserServices || !parserServices.esTreeNodeToTSNodeMap || !parserServices.program) {
          return;
        }
        const checker = parserServices.program.getTypeChecker();
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.value);
        const type = checker.getTypeAtLocation(tsNode);
        if (type.getCallSignatures().length > 0) {
          const returnType = type.getCallSignatures()[0]?.getReturnType();
          if (!returnType) {
            return;
          }
          if (isIllegalReturn(checker, returnType)) {
            context.report({
              node: node.value,
              messageId: "noVoidReturn"
            });
          }
        }
      }
    };
  })
});
function isIllegalReturn(checker, type) {
  const awaited = checker.getAwaitedType(type);
  if (!awaited) return false;
  if (awaited.isUnion()) {
    return awaited.types.some((t) => isIllegalReturn(checker, t));
  }
  return awaited.flags & (import_typescript.default.TypeFlags.Void | import_typescript.default.TypeFlags.Undefined) ? true : false;
}

// src/rules/mutation-property-order/constants.ts
var mutationFunctions = ["useMutation"];
var sortRules2 = [[["onMutate"], ["onError", "onSettled"]]];

// src/rules/mutation-property-order/mutation-property-order.rule.ts
var name7 = "mutation-property-order";
var rule7 = createPropertyOrderRule(
  {
    name: name7,
    meta: {
      type: "problem",
      docs: {
        description: "Ensure correct order of inference-sensitive properties in useMutation()",
        recommended: "error"
      },
      messages: {
        invalidOrder: "Invalid order of properties for `{{function}}`."
      },
      schema: [],
      hasSuggestions: true,
      fixable: "code"
    },
    defaultOptions: []
  },
  mutationFunctions,
  sortRules2
);

// src/rules.ts
var rules = {
  [name]: rule,
  [name2]: rule2,
  [name3]: rule3,
  [name4]: rule4,
  [name5]: rule5,
  [name6]: rule6,
  [name7]: rule7
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rules
});
module.exports = module.exports.default
//# sourceMappingURL=rules.cjs.map