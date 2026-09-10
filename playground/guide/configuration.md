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
        footerColumns: [
            { title: 'Docs', items: [{ text: 'Guide', link: '/guide/' }] }
        ],
        footerSocial: true,
        navOrder: 'menu-first'
    }
}
```

::: warning
Changing `banner.id` brings the bar back for readers who dismissed the previous one. That is the point — reuse an id and it stays hidden.
:::

`banner.variant` is `ink` (the flat default), `accent`, `success`, `warning`, `danger`, or `rainbow` — which always renders as a gradient across the four status colours, whatever `gradient` says. `navOrder` is `search-first` (the default theme's own order) or `menu-first`, which pins the menu against the title instead; it has no effect on the mobile bar, which always falls back to the hamburger.

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
| `heroCopy` / `heroCopied` | `Copy` / `Copied` |
| `heroCopyLabel` | `Copy {0}` |
| `backToTop` | `Top` |
| `footerSocial` | `Follow` |

The banner's `text` and `linkText` are content rather than labels, so they stay under `ff.banner`.

## Fonts

```css
:root {
    --ff-font-display: 'Montserrat', var(--vp-font-family-base);
}
```

::: danger
Loading a display face over the network without `font-display: swap` blocks the first paint of every page title.
:::
