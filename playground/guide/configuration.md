# Configuration

Everything the theme draws comes from custom properties and from the options under `themeConfig.ff`. Redeclare the properties you care about in your own stylesheet and leave the rest alone.

::: info Native VitePress options
This page only covers the options added by the theme. Every native VitePress option, such as `nav`, `sidebar`, `search`, `editLink`, `footer` or `outline`, still works and is set as usual in `themeConfig`, or per page in the frontmatter (for example `editLink: false`). See the [VitePress default theme reference](https://vitepress.dev/reference/default-theme-config).
:::

## Options

| Option | Default | What it does |
| --- | --- | --- |
| `preset` | — | Ready-made accent. See [Rebranding](#rebranding). |
| `banner` | — | Dismissible bar above the navigation. See [Banner](#banner). |
| `navOrder` | `'search-first'` | Order of search and menu. See [Navigation](#navigation). |
| `navSticky` | `true` | Pins the top bar. See [Navigation](#navigation). |
| `footerColumns` | `[]` | Link columns in the site footer. See [Footer](#footer). |
| `footerSocial` | `true` | Social icons beside the footer columns. See [Footer](#footer). |
| `backToTop` | `true` | Floating back-to-top control. See [Back to top and progress](#back-to-top-and-progress). |
| `progress` | `false` | Reading-progress bar. See [Back to top and progress](#back-to-top-and-progress). |
| `versions` | — | Version menu beside the site name. See [Versions](#versions). |
| `meta` | `{}` | Kicker above each page title. See [Kicker](#kicker). |
| `feedback` | — | "Was this page helpful?" widget. See [Feedback](#feedback). |
| `pageActions` | `{ copyLink: true }` | Page actions menu: "Copy link" only by default; `true` turns on every action, `false` hides the menu. See [Page actions](#page-actions). |
| `copyMarkdown` | `false` | Deprecated: use `pageActions: { copyMarkdown: true }`. |
| `llms` | `false` | Writes `llms.txt` and `llms-full.txt`. See [llms.txt](#llms-txt). |
| `og` | — | Open Graph image per page and the matching head tags. See [Open Graph images](#open-graph-images). |
| `blog` | — | Blog index, post header and RSS feed. See [Blog](#blog). |
| `labels` | — | Overrides for every string the theme adds. See [Translating](#translating). |

::: warning Trusted HTML
Banner text, hero title, tagline and quote, feature title and details, footer message and copyright, and card icons all render as HTML (`v-html`), not escaped text: a `<strong>` or a hand-written `<a>` shows up as markup. The trust boundary is the config file itself. These strings are meant to come from whoever writes `themeConfig.ff`, not from a reader, a comment or a CMS field someone else can edit. If a site pipes such input into these fields, sanitize it before it reaches the config; the theme does not.
:::

## Appearance

### Rebranding

Every value is a `--ff-*` custom property. Point the accent at your own colour and the whole site follows. For a ready-made accent instead, set `preset` to `emerald`, `crimson`, `violet` or `amber`; it is applied on `<html>` before the first paint.

```css
/* .vitepress/theme/custom.css, imported after the theme */
:root {
    --ff-color-accent: #0071d7;
    --ff-color-accent-hover: #0058a8;
    --ff-color-accent-soft: rgb(0 113 215 / 9%);
}

.dark {
    --ff-color-accent: #58baff;
    --ff-color-accent-hover: #8ed0ff;
    --ff-color-accent-contrast: #06121e;
}
```

### Tokens

`dist/style.css` lists them all, grouped, at the top of the file.

| Token | Role |
| --- | --- |
| `--ff-color-paper` | Page background |
| `--ff-color-surface` | Raised surfaces: code, cards, keys |
| `--ff-color-surface-alt` | Inline code, switches |
| `--ff-color-ink` | Body text |
| `--ff-color-ink-muted` | Secondary text |
| `--ff-color-ink-faint` | Labels and metadata |
| `--ff-color-rule` | Hairlines |
| `--ff-color-rule-strong` | Emphasised rules and borders |
| `--ff-color-accent` | The one brand colour |
| `--ff-color-success` / `-warning` / `-danger` | Status colours |
| `--ff-font-display` | Headings, titles, card and pager titles |
| `--ff-font-mono` | Labels, metadata, code |
| `--ff-size-hero` / `-h1` / `-h2` / `-h3` | Type scale |
| `--ff-layout-content` | Reading measure |
| `--ff-layout-wide` | Home and container width |
| `--ff-radius-sm` / `-md` | Corner radii |
| `--ff-rule-width` / `--ff-rule-accent-width` | Rule weights |
| `--ff-hero-glow-opacity` | Hero light washes, `0` (off) by default |
| `--ff-motion-duration` / `-slow` / `-enter` | Hover, slow and hero entrance timings |
| `--ff-motion-ease` | Easing shared by every transition |

### Fonts

```css
:root {
    --ff-font-display: 'Montserrat', var(--vp-font-family-base);
}
```

::: danger
Loading a display face over the network without `font-display: swap` blocks the first paint of every page title.
:::

## Layout

### Navigation

`navOrder` is `'search-first'` (the default theme's own order) or `'menu-first'`, which pins the menu against the title; it has no effect on the mobile bar, which always falls back to the hamburger. `navSticky: false` lets the bar, and the banner above it, scroll away with the page.

### Footer

`footerColumns` adds link columns to the site footer, on the home and page layouts. `footerSocial` (default `true`) adds a column of `themeConfig.socialLinks` icons, pinned to the right of those columns.

```ts
footerColumns: [
    { title: 'Docs', items: [{ text: 'Guide', link: '/guide/' }] }
]
```

### Banner

A dismissible bar above the navigation.

```ts
banner: {
    id: 'v5',
    text: 'Version 5 is out.',
    link: '/whats-new',
    linkText: 'Read the notes',
    variant: 'accent',
    gradient: true,
    icon: '🎉'
}
```

`variant` is `ink` (the flat default), `accent`, `success`, `warning`, `danger` or `rainbow`. `gradient: true` fades the bar toward a second shade; `rainbow` is always a gradient.

::: warning
Changing `banner.id` brings the bar back for readers who dismissed the previous one. That is the point — reuse an id and it stays hidden.
:::

### Back to top and progress

`backToTop` (default `true`) is the floating return-to-top control; its tooltip reuses the default theme's `returnToTopLabel` when set. `progress: true` adds a thin reading-progress bar at the very top of the viewport.

### Wide layout

`wide: true` in a page's frontmatter widens the text column to the full band and hides the outline, for wide tables and API listings. See [Wide layout](/guide/wide).

### Versions

```ts
versions: {
    current: 'v2',
    items: [{ text: 'v1', link: 'https://v1.example.com' }]
}
```

`current` is the text of the menu button; `items` are `{ text, link }` entries, one per other version of the docs. `labels.versionSwitcher` starts the menu's accessible name, followed by `current` so the name contains the visible text.

## Page

### Kicker

The line printed above every page title: section name (read from the sidebar), reading time and last update. `meta: false` drops it; each item defaults to `true`, and `false` hides just that item.

```ts
meta: {
    section: true,
    readingTime: true,
    wordsPerMinute: 200,
    lastUpdated: true
}
```

`lastUpdated` needs `lastUpdated: true` in the site config. The stamp is formatted with `Intl.RelativeTimeFormat` in the page's own `lang`.

### Feedback

A "Was this page helpful?" widget under each doc page. `feedback` is `true` or `{ url, question }`; `question` replaces the label.

Each vote is sent to `url` with `navigator.sendBeacon`, as the JSON string `{ page, value, lang }`: `value` is `'yes'` or `'no'` and `page` is the source path. It also fires an `ff:feedback` event on `window`, with the same object in `detail`, so a site can forward it to its own analytics:

```ts
window.addEventListener('ff:feedback', (event) => console.log(event.detail))
```

### Page actions

A split button in the page kicker. By default only "Copy link" is on; `pageActions: true` turns on every action and `pageActions: false` hides the menu. For finer control, pass an object (only the flags you set are on):

```ts
pageActions: {
    copyMarkdown: true,
    copyLink: true,
    share: ['x', 'linkedin', 'bluesky', 'mastodon'],
    mastodonInstance: 'mastodon.social'
}
```

The main part of the button copies the page link, or the Markdown when `copyLink` is off; the chevron opens a menu with "Copy as Markdown" (the page source, frontmatter removed) and the share links. With neither copy enabled, a single "Share" button opens the menu. Copied and shared URLs omit the query and the hash. The menu is hidden on the home layout.

Mastodon has no universal share intent, so its link opens the share page of `mastodonInstance`. Share links open in a new tab, with the page title and its URL.

The Markdown source is read at build time by `ffTransformPageData` (see [Custom build hooks](#custom-build-hooks)). Without the option the helper does nothing, so no source text reaches the bundle.

## Home page

Standard VitePress home frontmatter, read with an editorial hierarchy: `hero.name` becomes the kicker, `hero.text` the headline. Three additions fill the page out, all typed by the exported `HeroExtras` interface:

- `hero.command` puts an install panel in the second column of the hero, carrying the command and the actions. The box and its "Install" heading only print when there are actions to go with the command; with none, it is the bare command line, borderless outside its own. It is sized to the panel's own fixed box.
- `hero.quote` prints a short line under the tagline, ruled and set in italics like a markdown blockquote. Inline HTML works, so a term inside it can carry its own `<strong>`.
- `hero.meta` prints a colophon strip under the hero.

Add `hero.image` (standard VitePress frontmatter, any `<img>` source including a gif) or fill the `home-hero-image` slot, and that image claims the second column instead, split 50/50 with the text rather than the panel's narrower share. The panel then drops under the text on the left, always bare there since the actions already sit under the text either way.

`hero.command` also takes an array of `{ label, value }` tabs instead of a single string, one command per package manager say. A tab strip, styled like the theme's `::: code-group` tabs, prints above the line, and the copy button always follows the active tab:

```yaml
hero:
  command:
    - label: npm
      value: npm install my-project
    - label: pnpm
      value: pnpm add my-project
    - label: bun
      value: bun add my-project
```

A complete home page:

```yaml
---
layout: home

hero:
  name: My project
  text: A headline that carries the page.
  tagline: One or two sentences of standfirst.
  command: npm install my-project
  quote: <strong>My project</strong> — what the name means, in one line.
  meta:
    - label: Licence
      value: MIT
    - label: Version
      value: 1.4.x
    - label: Dependencies
      value: None
  actions:
    - theme: brand
      text: Get started
      link: /guide/
features:
  - title: Numbered automatically
    details: Feature cells count themselves.
---
```

The hero can also carry two soft washes of light, one accent and one neutral, behind the headline. They are off by default; raise `--ff-hero-glow-opacity`, which drives both at once and takes any value between `0` and `1`. Their colours come from `--ff-color-accent-glow` and `--ff-color-accent-soft`, per scheme.

```css
:root {
    --ff-hero-glow-opacity: 1;
}
```

## Build output

### llms.txt

`llms: true` writes two files to the output directory: `llms.txt`, an index (title, link and description of each page), and `llms-full.txt`, the Markdown of every page. Links are absolute when `sitemap.hostname` is set, and respect `base` and `cleanUrls`. `404.md` and pages with `llms: false` are skipped.

### Open Graph images

`og` is an object `{ fonts, hostname? }`; `true` alone is rejected for lack of a font. At the end of the build, a 1200x630 PNG per page is drawn into `og/` (site name, page title, description, a rule in the accent colour), and `og:image`, `og:title`, `og:description` and `twitter:card: summary_large_image` are added to the page head.

```ts
og: {
    hostname: 'https://example.com',
    fonts: [{ name: 'JetBrains Mono', path: '.vitepress/fonts/JetBrainsMono-Bold.ttf', weight: 700 }]
}
```

- `fonts` is a list of `{ name, path, weight?, style? }`. Files are TTF, OTF or WOFF (not WOFF2), `path` is relative to the VitePress root (the folder holding `.vitepress`), and the first font sets the family. This playground uses JetBrains Mono (OFL, licence in `.vitepress/fonts/`).
- `hostname` is the absolute address the image URLs start with. It defaults to `sitemap.hostname`.
- It needs the optional peer dependencies `satori` and `@resvg/resvg-js`: `npm install satori @resvg/resvg-js`.

### Blog

Posts are Markdown pages under `blog.dir` (default `blog`) with a `date` in their frontmatter. Give the index page, `blog/index.md`, `layout: blog` to list them, newest first; each post gets a header with its date, author and tags. See the [playground blog](/blog/).

```ts
blog: {
    dir: 'blog',
    authors: { ada: { name: 'Ada Lovelace', link: 'https://example.com/ada' } },
    rss: { hostname: 'https://example.com' }
}
```

```md
---
title: Hello, editorial
date: 2026-10-12
author: ada
tags: [theme, design]
excerpt: Shown in the list and in the feed.
---
```

| Frontmatter | Effect |
| --- | --- |
| `date` | Required for a page to count as a post. |
| `author` | A key of `blog.authors` (`{ name, link?, avatar? }`), or a plain name. |
| `tags` | List of tags, printed as labels. |
| `excerpt` | Summary shown in the list and in the feed. |

`rss` is `true` or `{ hostname?, copyright? }`. It writes `feed.xml` and adds the `<link rel="alternate">` tag. It needs the optional peer dependency `feed` (`npm install feed`) and an absolute address: `rss.hostname`, else `sitemap.hostname`.

## Custom build hooks

`extends: baseConfig` wires in three hooks:

- `ffTransformPageData` reads each page's Markdown source for "Copy as Markdown".
- `ffBuildEnd` writes `llms.txt`, `feed.xml` and the Open Graph images.
- `ffTransformHead` adds the accent preset and banner scripts, the RSS alternate link and the Open Graph tags.

VitePress replaces a hook declared by the site instead of merging it, so a site with its own `transformPageData`, `buildEnd` or `transformHead` calls the matching helper from it:

```ts
import baseConfig, {
    ffBuildEnd, ffTransformHead, ffTransformPageData
} from '@frontfactory/vitepress-theme/config'

export default defineConfig({
    extends: baseConfig,
    transformPageData(pageData, ctx) {
        // ...your own changes...
        return ffTransformPageData(pageData, ctx)
    },
    async buildEnd(siteConfig) {
        // ...your own work...
        await ffBuildEnd(siteConfig)
    },
    transformHead(ctx) {
        // returns the entries to merge with yours
        return [...ffTransformHead(ctx), ['meta', { name: 'author', content: 'Ada' }]]
    }
})
```

## Per-page frontmatter

| Frontmatter | Effect |
| --- | --- |
| `docMeta: false` | Drops the kicker. |
| `section: Guide` | Overrides the section name in the kicker. |
| `progress: false` | Hides the progress bar. |
| `feedback: false` | Hides the feedback widget. |
| `llms: false` | Leaves the page out of `llms.txt` and `llms-full.txt`. |
| `og: false` | Generates no Open Graph image for the page, and adds no `og:image` tag. |
| `wide: true` | Widens the text column to the full band and hides the outline. See [Wide layout](/guide/wide). |

The blog's own frontmatter (`date`, `author`, `tags`, `excerpt`) is listed under [Blog](#blog).

## Translating

Every string the theme adds lives in `themeConfig.ff.labels`, so it is declared per locale like any other default-theme label. `{0}` stands for the value the label describes.

```ts
locales: {
    root: { label: 'English', lang: 'en' },
    fr: {
        label: 'Français',
        lang: 'fr',
        themeConfig: {
            returnToTopLabel: 'Retour en haut',
            ff: {
                banner: { id: 'v5', text: 'La version 5 est sortie.', linkText: 'Lire les notes' },
                labels: {
                    bannerDismiss: 'Fermer l’annonce',
                    readingTime: '{0} min de lecture',
                    lastUpdated: 'Mis à jour {0}',
                    heroInstall: 'Installation',
                    heroCopied: 'Copié',
                    heroCopyLabel: 'Copier {0}',
                    backToTop: 'Haut',
                    footerSocial: 'Nous suivre',
                    newTab: 's’ouvre dans un nouvel onglet'
                }
            }
        }
    }
}
```

| Label | Default |
| --- | --- |
| `bannerDismiss` | `Dismiss announcement` |
| `readingTime` | `{0} min read` |
| `lastUpdated` | `Updated {0}` |
| `heroInstall` | `Install` |
| `heroCopied` | `Copied` |
| `heroCopyLabel` | `Copy {0}` |
| `backToTop` | `Top` |
| `returnToTop` | `Return to top` |
| `footerSocial` | `Follow` |
| `newTab` | `opens in a new tab` |
| `sponsors` | `Sponsors` |
| `sponsorsAction` | `Become a sponsor` |
| `feedbackQuestion` | `Was this page helpful?` |
| `feedbackYes` | `Yes` |
| `feedbackNo` | `No` |
| `feedbackThanks` | `Thanks for your feedback` |
| `copyMarkdown` | `Copy as Markdown` |
| `copyMarkdownHint` | `Page source` |
| `pageActions` | `More page actions` |
| `copyLink` | `Copy link` |
| `linkCopied` | `Link copied` |
| `codeCopied` | `Copied` |
| `share` | `Share` |
| `shareOn` | `Share on {0}` |
| `versionSwitcher` | `Version` |
| `blogBy` | `By {0}` |
| `blogEmpty` | `No posts yet` |

The banner's `text` and `linkText` are content rather than labels, so they stay under `ff.banner`. The back-to-top tooltip reuses the default theme's `returnToTopLabel` when set, otherwise `returnToTop`.

## Printing

No option needed. Printing a page drops the navigation, sidebar, outline, banner, back-to-top control, progress bar, feedback widget and previous/next links, forces the light palette — code included — even in dark mode, and prints the address after each external link.

## Troubleshooting

The theme tracks the VitePress 2 alphas closely: the default theme is still being restructured between them, and the layout overrides here are written against the version in `peerDependencies`. Keep the host project on the same alpha.

If a change to the theme does not show up, suspect a stale Vite cache before suspecting the CSS. The stylesheet is a built file living outside the site root, so `.vitepress/cache` can keep serving an old copy: delete it and restart. In the browser, `getComputedStyle(document.documentElement).getPropertyValue('--ff-layout-wide')` tells you which stylesheet you are actually looking at.
