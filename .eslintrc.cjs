/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ["import", "simple-import-sort", "react", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "@electron-toolkit/eslint-config-ts/recommended",
    "@electron-toolkit/eslint-config-prettier",
  ],
  rules: {
    // Сортировка импортов с разделением групп
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Импорты React
          ["^react", "^@react"],

          // Импорты сторонних библиотек
          ["^@?\\w", "^components", "^utils"],

          // Импорты с алиасами
          ["^@/features"],
          ["^@/shared"],
          ["^@/widgets"],
          ["^@/pages"],
          ["^@/entities"],

          ["^[./]", "^[../]"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",

    // Отключение типа возврата у функций
    "@typescript-eslint/explicit-function-return-type": "off",

    // Прочие правила
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      alias: {
        map: [
          ["@/features", "./src/features"],
          ["@/shared/components/ui", "./src/shared/components/ui"],
          ["@/shared/hooks", "./src/shared/hooks"],
          ["@/shared/lib/utils", "./src/shared/lib/utils"],
          ["@/entities", "./src/entities"],
          ["@/pages", "./src/pages"],
          ["@/widgets", "./src/widgets"], // Добавьте алиас для @/widgets, если используете
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
