/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  rules: {
    // Здесь можно переопределять или добавлять свои правила
    "selector-class-pattern": null, // Отключает строгий паттерн имен классов (полезно для Next.js модулей)
  },
};
