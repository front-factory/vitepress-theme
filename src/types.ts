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
    /** Kicker line above the page title. Defaults to `true`. */
    enabled?: boolean
    /** Estimated reading time. Defaults to `true`. */
    readingTime?: boolean
    /** Words read per minute used by the estimate. Defaults to `200`. */
    wordsPerMinute?: number
    /** Section the page belongs to, taken from the sidebar. Defaults to `true`. */
    section?: boolean
    /** Relative last-updated stamp. Defaults to `true`, and needs `lastUpdated` in the site config. */
    lastUpdated?: boolean
}

export interface ThemeOptions {
    /** Dismissible announcement bar above the navigation. */
    banner?: BannerConfig
    /** Kicker line printed above every page title. */
    meta?: MetaConfig | false
    /** Link columns added to the site footer. */
    footerColumns?: FooterColumn[]
    /** Floating back-to-top control. Defaults to `true`. */
    backToTop?: boolean
}

export interface ThemeConfig extends DefaultTheme.Config {
    ff?: ThemeOptions
}

export type { DefaultTheme }
