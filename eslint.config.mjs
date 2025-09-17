import solvro from "@solvro/config/eslint";

export default [
  ...solvro,

  {
    files: ["**/*.spec.ts", "**/*.test.ts", "test/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    },
  },
];
