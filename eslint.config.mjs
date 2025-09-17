import { solvro } from "@solvro/config/eslint";

export default solvro({
  overrides: [
    {
      files: ["**/__tests__/**/*.{ts,tsx}", "**/*.spec.{ts,tsx}"],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: true,
          },
        ],
      },
    },
  ],
});
