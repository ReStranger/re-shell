/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    {
        rules: {
            indent: ["error", 4],
            quotes: ["error", "double"],
        },
    },
];
