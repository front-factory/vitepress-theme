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
        banner: { id: 'v5', text: 'Version 5 is out.', link: '/whats-new' },
        meta: { readingTime: true, wordsPerMinute: 200 },
        backToTop: true,
        footerColumns: [
            { title: 'Docs', items: [{ text: 'Guide', link: '/guide/' }] }
        ]
    }
}
```

::: warning
Changing `banner.id` brings the bar back for readers who dismissed the previous one. That is the point — reuse an id and it stays hidden.
:::

## Fonts

```css
:root {
    --ff-font-display: 'Montserrat', var(--vp-font-family-base);
}
```

::: danger
Loading a display face over the network without `font-display: swap` blocks the first paint of every page title.
:::
