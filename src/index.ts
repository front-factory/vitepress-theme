import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import FfLayout from './layout/FfLayout.vue';
import FfBlog from './layout/FfBlog.vue';
import Api from './content/Api.vue';
import Badge from './content/Badge.vue';
import Callout from './content/Callout.vue';
import Card from './content/Card.vue';
import CardGrid from './content/CardGrid.vue';
import FileTree from './content/FileTree.vue';
import Kbd from './content/Kbd.vue';
import Steps from './content/Steps.vue';
import Tab from './content/Tab.vue';
import Tabs from './content/Tabs.vue';
import Timeline from './content/Timeline.vue';
import TimelineItem from './content/TimelineItem.vue';

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
        // DefaultTheme registers its own `Badge` before this runs; registering over it makes Vue warn
        // in dev, so the original is dropped first.
        delete app._context.components.Badge;

        app.component('Api', Api);
        app.component('Badge', Badge);
        // `layout: blog` in the frontmatter resolves to this component by name.
        // eslint-disable-next-line vue/component-definition-name-casing
        app.component('blog', FfBlog);
        app.component('Callout', Callout);
        app.component('Card', Card);
        app.component('CardGrid', CardGrid);
        app.component('FileTree', FileTree);
        app.component('Kbd', Kbd);
        app.component('Steps', Steps);
        app.component('Tab', Tab);
        app.component('Tabs', Tabs);
        app.component('Timeline', Timeline);
        app.component('TimelineItem', TimelineItem);
    }
};

export default theme;

export { default as Api } from './content/Api.vue';
export { default as Badge } from './content/Badge.vue';
export { default as Callout } from './content/Callout.vue';
export { default as Card } from './content/Card.vue';
export { default as CardGrid } from './content/CardGrid.vue';
export { default as FileTree } from './content/FileTree.vue';
export { default as Kbd } from './content/Kbd.vue';
export { default as Steps } from './content/Steps.vue';
export { default as Tab } from './content/Tab.vue';
export { default as Tabs } from './content/Tabs.vue';
export { default as Timeline } from './content/Timeline.vue';
export { default as TimelineItem } from './content/TimelineItem.vue';

export {
    defaultLabels, useLabels, useThemeOptions 
} from './composables/options';

export type {
    BannerConfig,
    BlogAuthor,
    BlogConfig,
    BlogRssConfig,
    FeedbackConfig,
    FooterColumn,
    FooterLink,
    HeroCommandTab,
    HeroExtras,
    HeroMetaItem,
    MetaConfig,
    OgConfig,
    OgFont,
    ThemeConfig,
    ThemeLabels,
    ThemeOptions,
    VersionsConfig
} from './types';
