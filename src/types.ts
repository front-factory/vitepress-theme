import type { DefaultTheme } from 'vitepress/theme'

export interface BannerConfig {
    /** Stable id — changing it brings the banner back for readers who dismissed the previous one. */
    id: string
    /** Text shown in the banner. Inline HTML is allowed. */
    text: string
    /** Optional link the whole banner points to. */
    link?: string
    /** Label of the trailing call to action. Defaults to `Read more`. */
    linkText?: string
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
    /** Hero copy button. Defaults to `Copy`. */
    heroCopy?: string
    /** Hero copy button once the command is on the clipboard. Defaults to `Copied`. */
    heroCopied?: string
    /** Accessible name of the hero copy button; `{0}` is the command. Defaults to `Copy {0}`. */
    heroCopyLabel?: string
    /** Visible text of the back-to-top control. Defaults to `Top`. */
    backToTop?: string
    /** Heading of the footer social column. Defaults to `Follow`. */
    footerSocial?: string
}

/** One entry of the colophon strip printed under the hero. */
export interface HeroMetaItem {
    label: string
    value: string
}

/**
 * The two additions this theme makes to the standard `layout: home` hero frontmatter. Both are
 * optional; everything else on `hero` stays the default theme's.
 */
export interface HeroExtras {
    /** Install line, printed in a panel beside the headline when the hero carries no image. */
    command?: string
    /** Colophon strip under the hero. */
    meta?: HeroMetaItem[]
}

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
    /** Overrides for the strings this theme adds. Declare them per locale to translate them. */
    labels?: ThemeLabels
}

export interface ThemeConfig extends DefaultTheme.Config {
    ff?: ThemeOptions
}

export type { DefaultTheme }
