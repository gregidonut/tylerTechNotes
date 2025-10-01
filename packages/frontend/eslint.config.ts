import eslintPluginAstro from "eslint-plugin-astro";
import betterTailwind from "eslint-plugin-better-tailwindcss";

export default [
    // add more generic rule sets here, such as:
    // js.configs.recommended,
    ...eslintPluginAstro.configs.recommended,
    {
        plugins: {
            "better-tailwindcss": betterTailwind,
        },
        rules: {
            // override/add rules settings here, such as:
            // "astro/no-set-html-directive": "error"
        },
        settings: {
            "better-tailwindcss": {
                entryPoint: "src/styles/global.css",
            },
        },
    },
];
