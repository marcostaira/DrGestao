module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-non-null-assertion": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "prefer-const": "warn",
    "no-var": "error",
  },
  ignorePatterns: ["dist", "node_modules", "*.js", "coverage", "src/generated"],
};
