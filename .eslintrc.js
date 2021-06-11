module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2020,
    sourceType: "module"
  },
  extends: ["plugin:@typescript-eslint/recommended", "airbnb-typescript", "prettier"],
  rules: {
    "@typescript-eslint/no-use-before-define": "off",
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
  }
};
