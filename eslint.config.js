import config from '@front-factory/eslint-config';
import vue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

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
        files: [
            '**/*.vue'
        ],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser
            }
        }
    },
    {
        // Api/Card/Kbd/Steps are the theme's public markdown components — registered and
        // consumed under these exact short names (`<Kbd>`, `<Steps>`...). Renaming them to
        // satisfy these rules would break every site's markdown.
        files: [
            'src/content/**/*.vue',
            'src/index.ts'
        ],
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/no-reserved-component-names': 'off'
        }
    },
    {
        // v-html here renders strings from themeConfig.ff (banner/hero/feature/footer/card
        // text), authored by the site owner in their own VitePress config — not third-party or
        // end-user input. Sanitizing would be misdirected; the trust boundary is the config file.
        files: [
            '**/*.vue'
        ],
        rules: {
            'vue/no-v-html': 'off'
        }
    }
);
