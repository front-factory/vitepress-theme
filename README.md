# @frontfactory/vitepress-theme

Editorial VitePress theme — hairline rules, numbered sections and monospaced metadata. One accent
token to make it yours.

It extends the VitePress default theme rather than forking it: search, i18n, mobile navigation and
every markdown feature keep working, while the whole surface is redrawn.

## Install

```bash
npm install @frontfactory/vitepress-theme
```

Requires Node 20+, `vitepress` 2 and `vue` 3.5 in the host project. Nothing else — the stylesheet is
shipped compiled, so Sass is not needed downstream.

## Use

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { extendConfig } from '@frontfactory/vitepress-theme/config'

export default extendConfig(
    defineConfig({
        title: 'My project',
        themeConfig: {
            nav: [{ text: 'Guide', link: '/guide/' }]
        }
    })
)
```

```ts
// .vitepress/theme/index.ts
import Theme from '@frontfactory/vitepress-theme'

export default Theme
```

`extendConfig` is required: it swaps the components the theme replaces, keeps the package out of
dependency pre-bundling, and injects the inline script that keeps a dismissed banner from painting.

## Rebranding

Every value is a `--ff-*` custom property. Point the accent at your own colour and the whole site
follows.

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

`dist/style.css` lists them all, grouped, at the top of the file.

## Options

Theme options live under `themeConfig.ff`.

```ts
themeConfig: {
    ff: {
        // Dismissible bar above the navigation. Change the id to bring it back.
        banner: {
            id: 'v5',
            text: 'Version 5 is out.',
            link: '/whats-new',
            linkText: 'Read the notes'
        },

        // Kicker printed above every page title. Set to false to drop it.
        meta: {
            section: true,        // section name, read from the sidebar
            readingTime: true,
            wordsPerMinute: 200,
            lastUpdated: true     // needs `lastUpdated: true` in the site config
        },

        // Link columns in the site footer (home and page layouts).
        footerColumns: [
            { title: 'Docs', items: [{ text: 'Guide', link: '/guide/' }] }
        ],

        backToTop: true
    }
}
```

Per page, `docMeta: false` in the frontmatter drops the kicker, and `section: Guide` overrides the
section name.

## Home page

Standard VitePress home frontmatter, read with an editorial hierarchy: `hero.name` becomes the
kicker, `hero.text` the headline. One addition, `hero.command`, prints an install line.

```yaml
---
layout: home

hero:
  name: My project
  text: A headline that carries the page.
  tagline: One or two sentences of standfirst.
  command: npm install my-project
  actions:
    - theme: brand
      text: Get started
      link: /guide/
features:
  - title: Numbered automatically
    details: Feature cells count themselves.
---
```

## Markdown components

Registered globally, no import needed.

| Component | Use |
| --- | --- |
| `<Api name kind signature since deprecated>` | An API entry: ruled heading, monospaced signature |
| `<CardGrid :columns>` / `<Card title icon link>` | Card grids |
| `<Steps>` | Wraps an ordered list into a numbered rail |
| `<Kbd>` | A key |

## Developing locally

```bash
npm install
npm run dev              # rebuilds dist/style.css on change
npm run dev:playground   # the demo site, in another terminal
```

The playground under `playground/` exercises the whole surface: home, doc pages, every markdown
feature and every component.

To try it against a real site, link it:

```bash
# in this repo
npm link

# in the docs repo
npm link @frontfactory/vitepress-theme
```

## Publishing

`npm publish` runs the stylesheet build through `prepack`. The package ships Vue and TypeScript
sources plus the compiled CSS; the host project compiles the components with its own Vite.

## Licence

MIT
