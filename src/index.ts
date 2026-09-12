import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import FfLayout from './layout/FfLayout.vue';
import Api from './content/Api.vue';
import Card from './content/Card.vue';
import CardGrid from './content/CardGrid.vue';
import Kbd from './content/Kbd.vue';
import Steps from './content/Steps.vue';

import '../dist/style.css';

/**
 * Editorial VitePress theme.
 *
 * It keeps the default theme underneath — search, i18n, mobile navigation and every markdown
 * feature stay untouched — and replaces the whole surface: type, rules, numbering, hero, feature
 * grid and footer.
 */
const theme: Theme = {
    extends: DefaultTheme,
    Layout: FfLayout,
    enhanceApp({ app }) {
        app.component('Api', Api);
        app.component('Card', Card);
        app.component('CardGrid', CardGrid);
        app.component('Kbd', Kbd);
        app.component('Steps', Steps);
    }
};

export default theme;

export { default as Api } from './content/Api.vue';
export { default as Card } from './content/Card.vue';
export { default as CardGrid } from './content/CardGrid.vue';
export { default as Kbd } from './content/Kbd.vue';
export { default as Steps } from './content/Steps.vue';

export {
    defaultLabels, useLabels, useThemeOptions 
} from './composables/options';

export type {
    BannerConfig,
    FooterColumn,
    FooterLink,
    HeroCommandTab,
    HeroExtras,
    HeroMetaItem,
    MetaConfig,
    ThemeConfig,
    ThemeLabels,
    ThemeOptions
} from './types';
