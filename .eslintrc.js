// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {},
  extends: [
    // /!\ Order matters: the next one overrides rules from the previous one
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'airbnb',
    // Already done by Airbnb
    //'plugin:react/recommended'
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  plugins: ['simple-import-sort', 'react-hooks'],
  env: {
    browser: true
  },
  globals: {
    // Jest Puppeteer, see https://github.com/smooth-code/jest-puppeteer/blob/v4.0.0/README.md#configure-eslint
    page: true
  },

  rules: {
    'no-console': 'off',
    'no-alert': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'lines-between-class-members': 'off',
    'spaced-comment': 'off',
    'no-lonely-if': 'off',
    'max-classes-per-file': 'off',
    // [no-return-assign should be configurable to ignore arrow-functions](https://github.com/eslint/eslint/issues/9471)
    'no-return-assign': 'off',
    camelcase: 'off',

    'prettier/prettier': 'error',

    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    // [Avoid Export Default](https://basarat.gitbook.io/typescript/main-1/defaultisbad)
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',

    'simple-import-sort/sort': [
      'error',
      {
        // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/v5.0.2/src/sort.js#L3-L15
        groups: [
          // Side effect imports
          ['^\\u0000'],

          // Packages
          [
            // React first
            '^react$',
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter
            '^@?\\w'
          ],

          // Absolute imports and other imports such as Vue-style `@/foo`
          // Anything that does not start with a dot
          ['^[^.]'],

          // Relative imports
          [
            // https://github.com/lydell/eslint-plugin-simple-import-sort/issues/15

            // ../whatever/
            '^\\.\\./(?=.*/)',
            // ../
            '^\\.\\./',
            // ./whatever/
            '^\\./(?=.*/)',
            // Anything that starts with a dot
            '^\\.',
            // .html are not side effect imports
            '^.+\\.html$',
            // .scss/.css are not side effect imports
            '^.+\\.s?css$'
          ]
        ]
      }
    ],

    // https://github.com/typescript-eslint/typescript-eslint/blob/v4.1.0/packages/eslint-plugin/docs/rules/no-use-before-define.md
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',

    // https://github.com/typescript-eslint/typescript-eslint/blob/v4.1.0/packages/eslint-plugin/docs/rules/no-shadow.md
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',

    // https://github.com/typescript-eslint/typescript-eslint/blob/v4.5.0/packages/eslint-plugin/docs/rules/no-empty-function.md
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',

    // https://github.com/typescript-eslint/typescript-eslint/blob/v4.5.0/packages/eslint-plugin/docs/rules/no-useless-constructor.md
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/catch-error-name': 'off',
    // [IE does not support for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of#Browser_compatibility)
    'unicorn/no-for-loop': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-query-selector': 'off',

    'jsx-a11y/label-has-associated-control': 'off',

    'react/no-unescaped-entities': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-pascal-case': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/static-property-placement': 'off',
    'react/state-in-constructor': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    'jest/no-expect-resolves': 'error',
    'jest/expect-expect': 'off'
  },

  // FIXME ?
  // [Support for mixed JS and TS codebases - do not lint JS files](https://github.com/typescript-eslint/typescript-eslint/issues/109)
  // [typescript/no-var-requires should only be enabled on ts/tsx files](https://github.com/Shopify/eslint-plugin-shopify/issues/159)
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['examples/*/*.tsx'],
      rules: {
        'react/require-default-props': 'off'
      }
    },
    {
      files: ['*.test.tsx'],
      rules: {
        'jsx-a11y/iframe-has-title': 'off'
      }
    }
  ]
};

module.exports = config;
