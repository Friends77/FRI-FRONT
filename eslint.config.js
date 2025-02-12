import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'padding-line-between-statements': [
        'error',
        // export 사이에 공백 추가
        { blankLine: 'always', prev: 'export', next: 'export' },
        // 변수 선언 사이에 공백 추가
        { blankLine: 'always', prev: 'const', next: 'const' },
        { blankLine: 'always', prev: 'let', next: 'let' },
        // return문 앞에 한 줄 공백 추가
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },
);
