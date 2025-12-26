/** @type {import("prettier").Config} */
export default {
    plugins: [
        "prettier-plugin-astro",
        "prettier-plugin-tailwindcss",
        "prettier-plugin-classnames",
        "prettier-plugin-merge",
    ],
    tailwindStylesheet: "./src/styles/global.css",
    tailwindFunctions: ["tv"],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
    printWidth: 80,
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "all",
    useTabs: false,
};
