import globals from "globals";
import pluginJs from "@eslint/js";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    ignores: ["test/**/*", "docs/**/*", "jest.config.*"],
  },
  {
    files: ["source/**/*"],
    languageOptions: {
      globals: {
				...globals.browser,
				...globals.node
			}
    },
    rules: {
      ...prettierConfig.rules,
    },
  },
	{
		// For all files in source/tests/, include Jest globals (describe, it, ...)
		files: ["source/tests/**/*"],
		languageOptions: {
			globals: {...globals.jest},
		}
	}
];
