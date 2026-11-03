# Configuration

Everything the theme draws comes from custom properties. Redeclare the ones you care about in your own stylesheet and leave the rest alone.

## Rebranding

```css
/* .vitepress/theme/custom.css */
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

## Tokens

| Token | Role |
| --- | --- |
| `--ff-color-paper` | Page background |
| `--ff-color-surface` | Raised surfaces: code, cards, inputs |
| `--ff-color-ink` | Body text |
| `--ff-color-ink-muted` | Secondary text |
| `--ff-color-rule` | Hairlines |
| `--ff-color-accent` | The one brand colour |
| `--ff-font-display` | Headings and titles |
| `--ff-layout-content` | Reading measure |

## Theme options

Options live under `themeConfig.ff`.

```ts
themeConfig: {
    ff: {
        banner: {
            id: 'v5',
            text: 'Version 5 is out.',
            link: '/whats-new',
            variant: 'accent',
            gradient: true,
            icon: '🎉'
        },
        meta: { readingTime: true, wordsPerMinute: 200 },
        backToTop: true,
        progress: true,
        feedback: { url: 'https://example.com/feedback' },
        copyMarkdown: true,
        llms: true,
        versions: {
            current: 'v1.7',
            items: [{ text: 'v1.6', link: 'https://example.com/v1.6/' }]
        },
        footerColumns: [
            { title: 'Docs', items: [{ text: 'Guide', link: '/guide/' }] }
        ],
        footerSocial: true,
        navOrder: 'menu-first',
        navSticky: false,
        preset: 'emerald'
    }
}
```

| Option | Default | What it does |
| --- | --- | --- |
| `banner` | — | Dismissible announcement bar above the navigation. See [Banner](#banner). |
| `meta` | `{}` | Kicker above each page title: section, reading time, last update. `false` drops it. |
| `backToTop` | `true` | Floating back-to-top control. |
| `progress` | `false` | Thin reading-progress bar at the top of the viewport. |
| `feedback` | — | "Was this page helpful?" widget under each doc page. See [Feedback](#feedback). |
| `copyMarkdown` | `false` | "Copy as Markdown" button in the page kicker. See [Copy as Markdown](#copy-as-markdown). |
| `llms` | `false` | Writes `llms.txt` and `llms-full.txt` at the end of the build. See [llms.txt](#llms-txt). |
| `versions` | — | Version menu beside the site name. See [Versions](#versions). |
| `footerColumns` | `[]` | Link columns in the site footer. |
| `footerSocial` | `true` | Column of `socialLinks` icons beside the footer columns. |
| `navOrder` | `'search-first'` | `'menu-first'` pins the menu against the title. No effect on the mobile bar. |
| `navSticky` | `true` | `false` lets the bar, and the banner above it, scroll away with the page. |
| `preset` | — | Ready-made accent: `emerald`, `crimson`, `violet` or `amber`. Applied before the first paint. |
| `labels` | — | Overrides for every string the theme adds. See [Translating](#translating). |

### Per page

| Frontmatter | Effect |
| --- | --- |
| `docMeta: false` | Drops the kicker. |
| `section: Guide` | Overrides the section name in the kicker. |
| `progress: false` | Hides the progress bar. |
| `feedback: false` | Hides the feedback widget. |
| `llms: false` | Leaves the page out of `llms.txt` and `llms-full.txt`. |
| `wide: true` | Widens the text column to the full band and hides the outline. See [Wide layout](/guide/wide). |

### Banner

`variant` is `ink` (the flat default), `accent`, `success`, `warning`, `danger` or `rainbow`. `gradient: true` fades the bar toward a second shade; `rainbow` is always a gradient.

::: warning
Changing `banner.id` brings the bar back for readers who dismissed the previous one. That is the point — reuse an id and it stays hidden.
:::

### Feedback

`feedback` is `true` or `{ url, question }`. `question` replaces the label.

Each vote is sent to `url` with `navigator.sendBeacon`, as the JSON string `{ page, value, lang }`. It also fires an `ff:feedback` event on `window`, with the same object in `detail`:

```ts
window.addEventListener('ff:feedback', (event) => console.log(event.detail))
```

### Copy as Markdown

The source is read at build time by `ffTransformPageData`, which `extends: baseConfig` wires in. VitePress replaces a hook declared by the site instead of merging it, so a site with its own `transformPageData` calls the helper and returns its result:

```ts
import baseConfig, { ffTransformPageData } from '@frontfactory/vitepress-theme/config'

export default defineConfig({
    extends: baseConfig,
    transformPageData(pageData, ctx) {
        // ...your own changes...
        return ffTransformPageData(pageData, ctx)
    }
})
```

### llms.txt

`llms: true` writes two files to the output directory: `llms.txt`, an index (title, link and description of each page), and `llms-full.txt`, the Markdown of every page. Links are absolute when `sitemap.hostname` is set, and respect `base` and `cleanUrls`. `404.md` and pages with `llms: false` are skipped.

The files are written by `ffBuildEnd`, which `extends: baseConfig` wires in. A site with its own `buildEnd` calls the helper from it:

```ts
import baseConfig, { ffBuildEnd } from '@frontfactory/vitepress-theme/config'

export default defineConfig({
    extends: baseConfig,
    async buildEnd(siteConfig) {
        // ...your own work...
        await ffBuildEnd(siteConfig)
    }
})
```

The same applies to `transformHead` and `ffTransformHead`, which returns the entries to merge with yours.

### Versions

`current` is the text of the menu button; `items` are `{ text, link }` entries, one per other version of the docs. `labels.versionSwitcher` is the menu's accessible name.

## Translating

Every string the theme adds lives in `themeConfig.ff.labels`, so it is declared per locale like any other default-theme label. `{0}` stands for the value the label describes.

```ts
themeConfig: {
    returnToTopLabel: 'Retour en haut',
    ff: {
        labels: {
            readingTime: '{0} min de lecture',
            lastUpdated: 'Mis à jour {0}',
            heroInstall: 'Installation',
            backToTop: 'Haut',
            footerSocial: 'Nous suivre'
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
| `footerSocial` | `Follow` |
| `newTab` | `opens in a new tab` |
| `feedbackQuestion` | `Was this page helpful?` |
| `feedbackYes` | `Yes` |
| `feedbackNo` | `No` |
| `feedbackThanks` | `Thanks for your feedback` |
| `copyMarkdown` | `Copy as Markdown` |
| `versionSwitcher` | `Version` |

The banner's `text` and `linkText` are content rather than labels, so they stay under `ff.banner`.

## Printing

No option needed. Printing a page drops the navigation, sidebar, outline, banner, back-to-top control, progress bar, feedback widget and previous/next links, forces the light palette — code included — even in dark mode, and prints the address after each external link.

## Fonts

```css
:root {
    --ff-font-display: 'Montserrat', var(--vp-font-family-base);
}
```

::: danger
Loading a display face over the network without `font-display: swap` blocks the first paint of every page title.
:::
