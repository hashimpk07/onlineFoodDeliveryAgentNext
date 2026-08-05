import pluginJs from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import pluginImport from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import securityPlugin from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: globals.browser,
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      import: pluginImport,
      security: securityPlugin,
      prettier: prettier,
      unicorn: unicorn,
      sonarjs: sonarjs, // Ensure sonarjs is included here
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  pluginJs.configs.recommended,
  securityPlugin.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Prettier integration rules
      "prettier/prettier": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // File Naming
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["^.*\\.config\\.(js|ts|mjs)$", "^.*\\.d\\.ts$"],
        },
      ],

      // Custom Rules (Not covered by plugins)
      "spaced-comment": ["error", "always", { exceptions: ["-", "+"] }],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "no-useless-rename": "error",

      // Import/Export Rules
      "import/no-mutable-exports": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // fs, path
            "external", // react, next, packages
            "internal", // @/app @/lib etc
            "parent", // ../
            "sibling", // ./
            "index", // index file
            "type", // import type
            "object", // import { something } from JSON
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "next/**"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/newline-after-import": "error",
      "import/no-unresolved": [
        "error",
        {
          caseSensitive: true,
        },
      ],
      "no-duplicate-imports": ["error", { includeExports: true }],
      "import/no-cycle": ["error", { maxDepth: 2 }],

      // Whitespace and Punctuation (Style Rules)
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
        },
      ],
      "space-in-parens": ["error", "never"],
      "array-bracket-spacing": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "func-call-spacing": ["error", "never"],
      "computed-property-spacing": ["error", "never"],

      // Naming Conventions
      "no-underscore-dangle": ["error", { allow: ["_id", "__dirname"] }],

      // Complexity
      complexity: ["error", { max: 10 }],
      "max-lines": [
        "error",
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
      "max-depth": ["error", 4],

      // TypeScript-Specific Rules (customized)
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn"],

      // React unnecessary import rules
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],

      // React JSX Pascal Case Rule
      "react/jsx-pascal-case": [
        "error",
        {
          allowAllCaps: false,
          ignore: [],
        },
      ],

      // React: Prevent nesting component definitions inside another component
      "react/no-unstable-nested-components": ["error", { allowAsProps: true }],

      // React: Prevent re-renders by ensuring context values are memoized
      "react/jsx-no-constructed-context-values": "error",

      // React: Disallow array index as key in JSX
      "react/no-array-index-key": "warn",

      // SonarJS: Detect commented-out code
      "sonarjs/no-commented-code": "warn",
    },
  },
  globalIgnores([
    ".github/",
    ".husky/",
    "node_modules/",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/components/ui",
    "*.config.ts",
    "*.mjs",
    "src/app/(main)/dashboard/client-dashboard/page.js",
  ]),
]);
