module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir : __dirname, 
		sourceType: 'module',
	},
	ignorePatterns: [
		'.eslintrc.js',
		'postcss.config.js',
		'node_modules',
		'dist'
	],
	plugins: ['@typescript-eslint/eslint-plugin', 'react', 'optional-params'],
	root: true,
	rules: {
		'@typescript-eslint/explicit-function-return-type': ['error'],
		'@typescript-eslint/explicit-module-boundary-types': ['error'],
		'@typescript-eslint/no-explicit-any': ['error'],
		'eol-last': ['error'],
		'semi': ['error'],
		'object-curly-spacing': ['error', 'always'],
		'comma-dangle': ['error', 'always-multiline'],
		'@typescript-eslint/explicit-member-accessibility': ['error'],
		'@typescript-eslint/no-empty-interface': ['off'],
		'no-trailing-spaces': ['error'],
		'no-multiple-empty-lines': ['error', { max: 1 }],
		'quotes': ['error', 'single', { avoidEscape: true }],
		'space-infix-ops': ['error'],
		'react/jsx-curly-spacing': ['error', {
			'when': 'always',
			'children': {
				'when': 'always'
			}
		}],
		'space-in-parens': ['error', 'never'],
		'space-before-function-paren': ['error', 'never'],
		'keyword-spacing': ['error'],
		'space-before-blocks': ['error'],
		'jsx-quotes': ['error', 'prefer-single'],
		'react/jsx-tag-spacing': ['error'],
		'optional-params/max-optional-params': ['error', 1],
	},
};
