module.exports = {
    semi: true,
    useTabs: false,
    printWidth: 100,
    trailingComma: "all",
    singleQuote: false,
    tabWidth: 4,
    plugins: ["prettier-plugin-svelte"],
    overrides: [
        {
            files: ["package.json"],
            options: {
                tabWidth: 2
            }
        }
    ]
};
