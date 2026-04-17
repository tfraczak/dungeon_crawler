import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        matchMedia: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        Image: "readonly",
        Audio: "readonly",
        URLSearchParams: "readonly",
        localStorage: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    ignores: ["dist/", "node_modules/", "webpack.*.js", "postcss.config.js"],
  },
];
