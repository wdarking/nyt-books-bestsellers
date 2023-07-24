/* eslint-env node */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react", "react-refresh", "prettier"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "prettier/prettier": ["error"],
    "react/react-in-jsx-scope": "off",
  },
};
