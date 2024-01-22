module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.eslint.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["dist/**/*"],
  rules: {
    "no-console": ["error", { allow: ["error"] }],
    "no-void": ["error", { allowAsStatement: true }],
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],
    "no-nested-ternary": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        modifiers: ["destructured"],
        format: null,
      },
    ],
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/unbound-method": [
      "error",
      {
        ignoreStatic: true,
      },
    ],
  },
  overrides: [
    // allow devDependencies in configuration files
    {
      files: ["*.cjs", "*.config.js"],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: false,
          },
        ],
      },
    },
    // allow require in .cjs files
    {
      files: ["*.cjs"],
      rules: {
        "global-require": "off",
      },
    },
  ],
};
