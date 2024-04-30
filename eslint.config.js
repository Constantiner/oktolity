// @ts-nocheck
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import stylisticJs from "@stylistic/eslint-plugin-js";
import tsParser from "@typescript-eslint/parser";
import pluginImport from "eslint-plugin-import";
import reactAccessibility from "eslint-plugin-jsx-a11y";
import nodePlugin from "eslint-plugin-n";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import hooksPlugin from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import pluginSecurity from "eslint-plugin-security";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tsEslint from "typescript-eslint";

const ecmaVersion = 2022;
const reactFiles = ["**/*.{jsx,tsx}", "src/**"];

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
	{
		// Unicorn
		...eslintPluginUnicorn.configs["flat/recommended"],
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
			sourceType: "module",
			ecmaVersion,
			parser: tsParser,
			parserOptions: {
				ecmaVersion
			}
		},
		settings: {
			"import/parsers": {
				"@typescript-eslint/parser": []
			}
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
			"no-restricted-syntax": ["off"],
			"n/no-unsupported-features/es-syntax": [
				"error",
				{
					ignores: ["modules"]
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
		files: ["eslint.config.js"],
		rules: {
			"@typescript-eslint/ban-ts-comment": "off"
		}
	}
);
