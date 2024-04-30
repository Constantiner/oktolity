/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	printWidth: 120,
	useTabs: true,
	tabWidth: 4,
	trailingComma: "none",
	arrowParens: "avoid",
	overrides: [
		{
			files: ".huskyrc",
			options: { parser: "json" }
		},
		{
			files: ".lintstagedrc",
			options: { parser: "json" }
		},
		{
			files: ".stylelintrc",
			options: { parser: "json" }
		},
		{
			files: ".babelrc",
			options: { parser: "json" }
		}
	],
	plugins: [
		"prettier-plugin-packagejson",
		"prettier-plugin-tailwindcss" // MUST come last
	],
	tailwindFunctions: ["clsx"]
};

export default config;
