import js from '@eslint/js'
import vuePlugin from 'eslint-plugin-vue'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin
    },
    rules: {
      semi: 0,
    },
  },
  {
    files: ['**/*.ts'],
    ignores: ['docs/.vitepress/**/*.ts', 'vite.config.*', 'vitest.config.*'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.app.json'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  },
  {
    files: ['vite.config.*', 'vitest.config.*'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.node.json'
      }
    }
  },
  {
    files: ['docs/.vitepress/**/*.ts', 'docs/demo/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.vitepress.json'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  },
  {
    files: ['docs/demo/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        project: './tsconfig.vitepress.json',
        extraFileExtensions: ['.vue'],
        tsconfigRootDir: '.'
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: ['**/*.vue'],
    ignores: ['docs/demo/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        project: './tsconfig.app.json',
        extraFileExtensions: ['.vue'],
        tsconfigRootDir: '.'
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
