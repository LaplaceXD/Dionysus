module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    eqeqeq: "error",
    quotes: "off",
    "prefer-arrow-callback": "error",
    "no-var": "error",
    "no-eval": "error",
    "no-alert": "warn",
    "no-console": "error",
    "no-unused-vars": [
      "error",
      { args: "after-used", argsIgnorePattern: "^_" },
    ],
    "no-extra-semi": "error",
    "no-return-await": "error",
    "no-new-wrappers": "error",
    "no-await-in-loop": "error",
    "no-useless-catch": "error",
    "no-useless-return": "warn",
    "no-param-reassign": "error",
    "no-unneeded-ternary": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
