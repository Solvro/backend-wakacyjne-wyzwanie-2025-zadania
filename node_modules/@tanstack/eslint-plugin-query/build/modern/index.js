import {
  rules
} from "./chunk-4FWBSZRD.js";

// src/index.ts
var plugin = {
  meta: {
    name: "@tanstack/eslint-plugin-query"
  },
  configs: {},
  rules
};
Object.assign(plugin.configs, {
  recommended: {
    plugins: ["@tanstack/query"],
    rules: {
      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/no-rest-destructuring": "warn",
      "@tanstack/query/stable-query-client": "error",
      "@tanstack/query/no-unstable-deps": "error",
      "@tanstack/query/infinite-query-property-order": "error",
      "@tanstack/query/no-void-query-fn": "error",
      "@tanstack/query/mutation-property-order": "error"
    }
  },
  "flat/recommended": [
    {
      name: "tanstack/query/flat/recommended",
      plugins: {
        "@tanstack/query": plugin
      },
      rules: {
        "@tanstack/query/exhaustive-deps": "error",
        "@tanstack/query/no-rest-destructuring": "warn",
        "@tanstack/query/stable-query-client": "error",
        "@tanstack/query/no-unstable-deps": "error",
        "@tanstack/query/infinite-query-property-order": "error",
        "@tanstack/query/no-void-query-fn": "error",
        "@tanstack/query/mutation-property-order": "error"
      }
    }
  ]
});
var index_default = plugin;
export {
  index_default as default,
  plugin
};
//# sourceMappingURL=index.js.map