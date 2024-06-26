// @ts-nocheck
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import stylisticJs from "@stylistic/eslint-plugin-js";
import pluginImport from "eslint-plugin-import";
import reactAccessibility from "eslint-plugin-jsx-a11y";
import nodePlugin from "eslint-plugin-n";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import hooksPlugin from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactCompiler from "eslint-plugin-react-compiler";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import pluginSecurity from "eslint-plugin-security";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tsEslint from "typescript-eslint";

const reactFiles = ["**/*.{jsx,tsx}", "src/**"];

const compat = new FlatCompat();

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tsEslint.config(
	{
		// Top-level ignores aka .eslintignore replacement for flat config
		ignores: [".vscode/**", ".next/**", "build/**", "out/**", "node_modules/**"]
	},
	js.configs.recommended,
	...tsEslint.configs.recommended,
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
		rules: { "@typescript-eslint/explicit-function-return-type": ["error"] }
	},
	{
		rules: {
			"no-console": ["error"],
			"no-restricted-syntax": [
				"error",
				{
					selector: "ExportDefaultDeclaration",
					message: "Prefer named exports"
				}
			],
			"no-else-return": ["error", { allowElseIf: false }]
		}
	},
	pluginSecurity.configs.recommended,
	{
		// @stylistic/eslint-plugin-js
		plugins: {
			"@stylistic/js": stylisticJs
		},
		rules: {
			"@stylistic/js/semi": ["error", "always"]
		}
	},
	eslintPluginPrettierRecommended,
	...compat.config({
		extends: ["plugin:tailwindcss/recommended"]
	}),
	eslintPluginUnicorn.configs["flat/recommended"],
	{
		// Unicorn
		rules: {
			"unicorn/filename-case": ["error", { case: "camelCase" }],
			"unicorn/no-fn-reference-in-iterator": "off",
			"unicorn/no-reduce": "off",
			"unicorn/no-null": "off",
			"unicorn/switch-case-braces": "off",
			"unicorn/prefer-at": "off",
			"unicorn/no-array-reduce": "off",
			"unicorn/no-array-for-each": "off",
			"unicorn/no-array-callback-reference": "off",
			"unicorn/prefer-node-protocol": "off",
			"unicorn/prefer-object-from-entries": ["off"],
			"unicorn/no-useless-undefined": "off"
		}
	},
	{
		plugins: {
			import: pluginImport
		},
		languageOptions: {
			// parser: tsParser,
			parserOptions: {
				// Eslint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
				// This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
				ecmaVersion: "latest",
				sourceType: "module"
			}
		},
		settings: {
			// This will do the trick
			"import/parsers": {
				espree: [".js", ".cjs", ".mjs", ".jsx"]
			},
			"import/resolver": {
				typescript: true,
				node: true
			}
		},
		rules: {
			...pluginImport.configs.recommended.rules,
			"import/no-restricted-paths": [
				"error",
				{
					zones: [
						{
							target: "./src/**/*",
							from: "./src/app/**/*"
						},
						{
							target: "./src/server/**/*",
							from: "./src/model/**/*"
						},
						{
							target: "./src/lib/**/*",
							from: "./src/components/**/*"
						}
					]
				}
			],
			"import/no-cycle": "error"
		}
	},
	{
		files: ["**/*.cjs"],
		languageOptions: {
			globals: globals.node,
			sourceType: "commonjs"
		}
	},
	{
		files: ["**/*.d.ts"],
		rules: {
			"@typescript-eslint/triple-slash-reference": ["off"],
			"@typescript-eslint/no-namespace": ["off"],
			"unicorn/prevent-abbreviations": ["off"],
			"no-restricted-syntax": ["off"],
			"unicorn/filename-case": ["off"]
		}
	},
	{
		...nodePlugin.configs["flat/recommended"],
		rules: {
			...nodePlugin.configs["flat/recommended"].rules,
			"no-restricted-syntax": ["off"],
			"n/no-unsupported-features/es-syntax": [
				"error",
				{
					ignores: ["modules"]
				}
			],
			"n/no-missing-import": [
				"error",
				{
					tryExtensions: [".js", ".jsx", ".ts", ".tsx"],
					tsconfigPath: "./tsconfig.json"
				}
			]
		},
		languageOptions: {
			globals: globals.node
		}
	},
	{
		files: reactFiles,
		plugins: {
			"@next/next": nextPlugin
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs["core-web-vitals"].rules
		}
	},
	{
		...reactRecommended,
		files: reactFiles,
		languageOptions: {
			...reactRecommended.languageOptions,
			globals: {
				...globals.browser
			}
		},
		rules: {
			"react/jsx-uses-react": "off",
			"react/react-in-jsx-scope": "off",
			"react/prop-types": [2, { ignore: ["children"] }]
		},
		settings: {
			react: {
				version: "detect" // React version. "detect" automatically picks the version you have installed.
				// You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
				// default to latest and warns if missing
				// It will default to "detect" in the future
			}
		}
	},
	{
		files: reactFiles,
		plugins: {
			"react-hooks": hooksPlugin
		},
		rules: {
			...hooksPlugin.configs.recommended.rules,
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "error"
		}
	},
	{
		files: reactFiles,
		plugins: { "jsx-a11y": reactAccessibility },
		rules: {
			...reactAccessibility.configs.recommended.rules
		}
	},
	{
		files: reactFiles,
		ignores: ["src/app/**", "src/trpc/react.tsx", "src/components/ui/**"],
		plugins: { "react-refresh": reactRefresh },
		rules: {
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }]
		}
	},
	{
		files: reactFiles,
		plugins: { "react-compiler": reactCompiler },
		rules: {
			"react-compiler/react-compiler": "error"
		}
	},
	{
		files: reactFiles,
		rules: {
			"tailwindcss/no-custom-classname": ["warn", { whitelist: ["dashboard"] }]
		}
	},
	{
		files: ["eslint.config.js"],
		rules: {
			"@typescript-eslint/ban-ts-comment": "off"
		}
	},
	{
		files: ["src/components/ui/**"],
		rules: {
			"unicorn/filename-case": ["off"]
		}
	},
	{
		files: ["src/**/*Provider.tsx"],
		rules: {
			"react-refresh/only-export-components": "off"
		}
	}
);
