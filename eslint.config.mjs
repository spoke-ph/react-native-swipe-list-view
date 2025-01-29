import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import flowtype from "eslint-plugin-flowtype";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [...compat.extends(
  "eslint:recommended",
  "plugin:react/recommended",
  "plugin:prettier/recommended",
), {
  plugins: {
    prettier,
    react,
    flowtype
  },

  languageOptions: {
    globals: {
      ...globals.node,
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
    },

    parser: babelParser,
    ecmaVersion: 2018,
    sourceType: "module",

    parserOptions: {
      requireConfigFile: false,
      ecmaFeatures: {
        jsx: true
      },
      babelOptions: {
       presets: ["@babel/preset-react", "@babel/preset-flow"]
    },
    },
  },

  settings: {
    react: {
      version: "latest",
    },
  },

  rules: {
    "prettier/prettier": "error",
    "prefer-const": "warn",
    "no-var": "warn",
    "react/prop-types": "off",
    curly: "warn",
  },
}];
