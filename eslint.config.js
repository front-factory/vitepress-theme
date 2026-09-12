import config from '@front-factory/eslint-config'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {
        ignores: [
            'dist/**',
            'playground/.vitepress/cache/**',
            'playground/.vitepress/dist/**'
        ]
    },
    ...config,
    ...tseslint.configs.recommended,
    ...vue.configs['flat/recommended'],
    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser
            }
        }
    }
)
