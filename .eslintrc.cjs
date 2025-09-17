const { solvro } = require("@solvro/config/eslint");
const base = solvro();

module.exports = {
  ...base,
  overrides: [
    ...(base.overrides ?? []),
    {
      files: ["**/__tests__/**/*.ts", "test/**/*.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-empty-function": "off",
        "unicorn/prevent-abbreviations": "off",
      },
    },
  ],
};
