import type { DefaultTheme } from 'vitepress/theme';

export interface BannerConfig {
    /** Stable id — changing it brings the banner back for readers who dismissed the previous one. */
    id: string
    /** Text shown in the banner. Inline HTML is allowed. */
    text: string
    /** Optional link the whole banner points to. */
    link?: string
    /** Label of the trailing call to action. Defaults to `Read more`. */
    linkText?: string
    /**
     * Colour the banner is built from. Defaults to `ink`, the theme's original flat bar.
     * `rainbow` strings the status hues together and is always a gradient.
     */
    variant?: 'ink' | 'accent' | 'success' | 'warning' | 'danger' | 'rainbow'
    /** Paint the background as a gradient toward the variant's colour instead of flat. Ignored by `rainbow`, which is always a gradient. */
    gradient?: boolean
    /** Icon or emoji printed before the text, e.g. `'🎉'`. */
    icon?: string
}

export interface FooterLink {
    text: string
    link: string
    rel?: string
    target?: string
}

export interface FooterColumn {
    title: string
    items: FooterLink[]
}

export interface MetaConfig {
    /** Estimated reading time. Defaults to `true`. */
    readingTime?: boolean
    /** Words read per minute used by the estimate. Defaults to `200`. */
    wordsPerMinute?: number
    /** Section the page belongs to, taken from the sidebar. Defaults to `true`. */
    section?: boolean
    /** Relative last-updated stamp. Defaults to `true`, and needs `lastUpdated` in the site config. */
    lastUpdated?: boolean
}

/**
 * Every user-facing string this theme adds on top of the default one. They sit in `themeConfig`,
 * so a multi-language site declares them per locale like any other default-theme label.
 *
 * `{0}` in a label is replaced by the value it describes.
 */
export interface ThemeLabels {
    /** Accessible name of the banner dismiss button. Defaults to `Dismiss announcement`. */
    bannerDismiss?: string
    /** Reading-time estimate; `{0}` is the number of minutes. Defaults to `{0} min read`. */
    readingTime?: string
    /** Last-updated stamp; `{0}` is the relative time. Defaults to `Updated {0}`. */
    lastUpdated?: string
    /** Heading of the hero install panel. Defaults to `Install`. */
    heroInstall?: string
    /** Hero copy button once the command is on the clipboard. Defaults to `Copied`. */
    heroCopied?: string
    /** Accessible name of the hero copy button; `{0}` is the command. Defaults to `Copy {0}`. */
    heroCopyLabel?: string
    /** Visible text of the back-to-top control. Defaults to `Top`. */
    backToTop?: string
    /** Heading of the footer social column. Defaults to `Follow`. */
    footerSocial?: string
    /** Hidden hint after links that open in a new tab. Defaults to `opens in a new tab`. */
    newTab?: string
    /** Heading of the sponsors section. Defaults to `Sponsors`. */
    sponsors?: string
    /** Sponsors section action button, when the site sets `actionLink` but no `actionText`. Defaults to `Become a sponsor`. */
    sponsorsAction?: string
    /** API tag stating the version a symbol appeared in; `{0}` is the version. Defaults to `since {0}`. */
    apiSince?: string
    /** API tag marking a deprecated symbol. Defaults to `deprecated`. */
    apiDeprecated?: string
    /** Banner call to action when the banner has a link but no `linkText`. Defaults to `Read more`. */
    bannerCta?: string
    /** Question asked by the feedback widget. Defaults to `Was this page helpful?`. */
    feedbackQuestion?: string
    /** Positive answer of the feedback widget. Defaults to `Yes`. */
    feedbackYes?: string
    /** Negative answer of the feedback widget. Defaults to `No`. */
    feedbackNo?: string
    /** Message shown once a vote is cast. Defaults to `Thanks for your feedback`. */
    feedbackThanks?: string
    /** Button copying the page as Markdown. Defaults to `Copy as Markdown`. */
    copyMarkdown?: string
    /** Accessible name of the version menu. Defaults to `Version`. */
    versionSwitcher?: string
    /** Author line of a post; `{0}` is the name. Defaults to `By {0}`. */
    blogBy?: string
    /** Message of a blog index without any post. Defaults to `No posts yet`. */
    blogEmpty?: string
}

/** One author of the blog, declared in `ff.blog.authors` and referred to by key from a post. */
export interface BlogAuthor {
    name: string
    /** Page the author's name links to. */
    link?: string
    /** Small portrait printed before the name. */
    avatar?: string
}

/** RSS feed of the blog, set with `ff.blog.rss`. Needs the optional `feed` package. */
export interface BlogRssConfig {
    /** Absolute site address the feed links to. Defaults to `sitemap.hostname`. */
    hostname?: string
    copyright?: string
}

/** Blog settings, `ff.blog`. A post is a Markdown page under `dir` with a `date` in its frontmatter. */
export interface BlogConfig {
    /** Directory of the posts, relative to the source root. Defaults to `blog`. */
    dir?: string
    /** Authors by key; a post's `author` is such a key, or a plain name. */
    authors?: Record<string, BlogAuthor>
    /** Writes `feed.xml` at the end of the build. Off by default. */
    rss?: boolean | BlogRssConfig
}

/** One font handed to the Open Graph image renderer. */
export interface OgFont {
    /** Family name, also used to draw the text. The first font of the list is the one used. */
    name: string
    /** TTF, OTF or WOFF file (not WOFF2), relative to the site's source directory. */
    path: string
    weight?: number
    style?: 'normal' | 'italic'
}

/** Open Graph images, set with `ff.og`. Needs the optional `satori` and `@resvg/resvg-js` packages. */
export interface OgConfig {
    fonts: OgFont[]
    /** Absolute site address the image URLs point to. Defaults to `sitemap.hostname`. */
    hostname?: string
}

/** Options of the page feedback widget, when `ff.feedback` is an object instead of `true`. */
export interface FeedbackConfig {
    /** Endpoint that receives each vote as a `sendBeacon` POST. Without it, only the `ff:feedback` event fires. */
    url?: string
    /** Question to ask, instead of the `feedbackQuestion` label. */
    question?: string
}

/** Version menu of the navigation bar, set with `ff.versions`. */
export interface VersionsConfig {
    /** Version of the site being read; it is the text of the menu button. */
    current: string
    /** Other versions, each pointing at its own copy of the docs. */
    items: FooterLink[]
}

/** One entry of the colophon strip printed under the hero. */
export interface HeroMetaItem {
    label: string
    value: string
}

/** One tab of a multi-command install panel, e.g. npm vs. pnpm vs. bun. */
export interface HeroCommandTab {
    label: string
    value: string
}

/**
 * The two additions this theme makes to the standard `layout: home` hero frontmatter. Both are
 * optional; everything else on `hero` stays the default theme's.
 */
export interface HeroExtras {
    /**
     * Install line, printed in a panel. Beside the headline when the hero carries no image;
     * under it, carrying the command only, when an image claims that column instead. An array of
     * `{ label, value }` prints a tab strip above the line instead of a single command — one tab
     * per package manager, say — and the copy button follows whichever tab is active.
     */
    command?: string | HeroCommandTab[]
    /**
     * A short line under the tagline, set off with the same rule-and-italic treatment as a
     * markdown blockquote. Inline HTML is allowed, so a term inside it can be marked up, e.g.
     * `<strong>Charpente</strong> /ʃaʁ.pɑ̃t/ — French for…`.
     */
    quote?: string
    /** Colophon strip under the hero. */
    meta?: HeroMetaItem[]
}

/**
 * Text fields documented as accepting inline HTML (banner text, hero and feature copy, footer
 * message) are rendered as-is. They come from the site's own config and frontmatter, so they are
 * trusted: never feed them user-submitted content.
 */
export interface ThemeOptions {
    /** Dismissible announcement bar above the navigation. */
    banner?: BannerConfig
    /** Kicker line printed above every page title. */
    meta?: MetaConfig | false
    /** Link columns added to the site footer. */
    footerColumns?: FooterColumn[]
    /**
     * Column of `themeConfig.socialLinks` icons, pinned to the right of the footer columns.
     * Defaults to `true`, and shows nothing when the site declares no social link.
     */
    footerSocial?: boolean
    /** Floating back-to-top control. Defaults to `true`. */
    backToTop?: boolean
    /**
     * Thin reading-progress bar pinned to the top of the viewport. Off by default; a page opts out
     * with `progress: false` in its frontmatter.
     */
    progress?: boolean
    /**
     * "Was this page helpful?" widget under each doc page. Off by default; a page opts out with
     * `feedback: false` in its frontmatter. Each vote is sent to `url` with `navigator.sendBeacon`
     * as a JSON string `{ page, value: 'yes' | 'no', lang }`, and always dispatched on `window` as
     * an `ff:feedback` CustomEvent carrying the same object in `detail`.
     */
    feedback?: boolean | FeedbackConfig
    /**
     * Button in the page kicker that copies the page's Markdown source. Off by default. The source
     * is injected by `ffTransformPageData`, which a site defining its own `transformPageData` must
     * call from it.
     */
    copyMarkdown?: boolean
    /**
     * Writes `llms.txt` and `llms-full.txt` to the output directory at the end of the build. Off by
     * default; a page opts out with `llms: false` in its frontmatter.
     */
    llms?: boolean
    /**
     * Blog: `layout: blog` on the index page lists the posts of `dir`, each post gets a dated
     * header, and `rss` writes a feed at build time.
     */
    blog?: BlogConfig
    /**
     * One 1200x630 PNG per page in `og/`, with the matching `og:image` and `twitter:card` tags.
     * Off by default; a page opts out with `og: false` in its frontmatter. It needs fonts, so it
     * is an object (`true` alone is rejected at build time).
     */
    og?: boolean | OgConfig
    /** Version menu in the navigation bar, after the other controls. */
    versions?: VersionsConfig
    /** Order of the search box and the nav menu links in the top bar. Defaults to `search-first`. */
    navOrder?: 'search-first' | 'menu-first'
    /**
     * Pins the navigation bar to the top of the viewport while scrolling. Defaults to `true`; set
     * to `false` to have it scroll away with the page instead.
     */
    navSticky?: boolean
    /**
     * Ready-made accent, in both schemes, instead of the default indigo. Set on `<html>` by an
     * inline head script, so it paints from the first frame and reaches teleported overlays.
     */
    preset?: 'emerald' | 'crimson' | 'violet' | 'amber'
    /** Overrides for the strings this theme adds. Declare them per locale to translate them. */
    labels?: ThemeLabels
}

export interface ThemeConfig extends DefaultTheme.Config {
    ff?: ThemeOptions
}

// Declares `themeConfig.ff` on the default theme's own config type, so a host's `defineConfig`
// accepts it and the theme reads it without a cast.
declare module 'vitepress/theme' {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace DefaultTheme {
        interface Config {
            ff?: ThemeOptions
        }
    }
}

export type { DefaultTheme };
