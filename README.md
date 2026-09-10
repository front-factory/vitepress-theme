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
import baseConfig from '@frontfactory/vitepress-theme/config'

export default defineConfig({
    extends: baseConfig,
    title: 'My project',
    themeConfig: {
        nav: [{ text: 'Guide', link: '/guide/' }]
    }
})
```

```ts
// .vitepress/theme/index.ts
import Theme from '@frontfactory/vitepress-theme'

export default Theme
```

`extends: baseConfig` is required: it swaps the components the theme replaces, keeps the package out
of dependency pre-bundling, and injects the inline script that keeps a dismissed banner from
painting in the built site.

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

| Token                                         | Role                                    |
|-----------------------------------------------|-----------------------------------------|
| `--ff-color-paper`                            | Page background                         |
| `--ff-color-surface`                          | Raised surfaces: code, cards, keys      |
| `--ff-color-surface-alt`                      | Inline code, switches                   |
| `--ff-color-ink`                              | Body text                               |
| `--ff-color-ink-muted`                        | Secondary text                          |
| `--ff-color-ink-faint`                        | Labels and metadata                     |
| `--ff-color-rule`                             | Hairlines                               |
| `--ff-color-rule-strong`                      | Emphasised rules and borders            |
| `--ff-color-accent`                           | The one brand colour                    |
| `--ff-color-success` / `-warning` / `-danger` | Status colours                          |
| `--ff-font-display`                           | Headings, titles, card and pager titles |
| `--ff-font-mono`                              | Labels, metadata, code                  |
| `--ff-size-hero` / `-h1` / `-h2` / `-h3`      | Type scale                              |
| `--ff-layout-content`                         | Reading measure                         |
| `--ff-layout-wide`                            | Home and container width                |
| `--ff-radius-sm` / `-md`                      | Corner radii                            |
| `--ff-rule-width` / `--ff-rule-accent-width`  | Rule weights                            |
| `--ff-hero-glow-opacity`                      | Hero light washes, `0` (off) by default |

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

## Translating

Every string the theme adds sits in `themeConfig.ff.labels`, so it is translated the same way as any
default-theme label: per locale. `{0}` is replaced by the value the label describes.

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
                    bannerDismiss: 'Fermer l\u2019annonce',
                    readingTime: '{0} min de lecture',
                    lastUpdated: 'Mis à jour {0}',
                    heroInstall: 'Installation',
                    heroCopy: 'Copier',
                    heroCopied: 'Copié',
                    heroCopyLabel: 'Copier {0}',
                    backToTop: 'Haut'
                }
            }
        }
    }
}
```

| Label             | Default                 |
|-------------------|-------------------------|
| `bannerDismiss`   | `Dismiss announcement`  |
| `readingTime`     | `{0} min read`          |
| `lastUpdated`     | `Updated {0}`           |
| `heroInstall`     | `Install`               |
| `heroCopy`        | `Copy`                  |
| `heroCopied`      | `Copied`                |
| `heroCopyLabel`   | `Copy {0}`              |
| `backToTop`       | `Top`                   |

The banner's own `text` and `linkText` are content, not labels, so they stay under `ff.banner`. The
back-to-top tooltip reuses the default theme's `returnToTopLabel`, and the last-updated stamp is
formatted with `Intl.RelativeTimeFormat` in the page's own `lang`.

## Home page

Standard VitePress home frontmatter, read with an editorial hierarchy: `hero.name` becomes the
kicker, `hero.text` the headline. Two additions fill the page out.

The hero can also carry two soft washes of light, one accent and one neutral, behind the headline.
They are off by default — a site turns them on by raising `--ff-hero-glow-opacity`, which drives
both at once and takes any value between `0` and `1`:

```css
:root {
    --ff-hero-glow-opacity: 1;
}
```

Their colours come from `--ff-color-accent-glow` and `--ff-color-accent-soft`, per scheme.

`hero.command` puts an install panel in the second column of the hero, carrying the command and the
actions. It is used only when the page has no `hero.image` and nothing filled the `home-hero-image`
slot — an image still takes that column. `hero.meta` prints a colophon strip under the hero. Both
are typed by the exported `HeroExtras` interface.

```yaml
---
layout: home

hero:
  name: My project
  text: A headline that carries the page.
  tagline: One or two sentences of standfirst.
  command: npm install my-project
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

## Markdown components

Registered globally, no import needed.

| Component                                        | Use                                               |
|--------------------------------------------------|---------------------------------------------------|
| `<Api name kind signature since deprecated>`     | An API entry: ruled heading, monospaced signature |
| `<CardGrid :columns>` / `<Card title icon link>` | Card grids                                        |
| `<Steps>`                                        | Wraps an ordered list into a numbered rail        |
| `<Kbd>`                                          | A key                                             |

## Version

The theme tracks the VitePress 2 alphas closely — the default theme is still being restructured
between them, and the layout overrides here are written against the version in `peerDependencies`.
Keep the host project on the same alpha.

If a change to the theme does not show up, suspect a stale Vite cache before suspecting the CSS: the
stylesheet is a built file living outside the site root, so `.vitepress/cache` can keep serving an
old copy. Delete it and restart. In the browser,
`getComputedStyle(document.documentElement).getPropertyValue('--ff-layout-wide')` tells you which
stylesheet you are actually looking at.

## Developing locally

```bash
npm install
npm run dev              # rebuilds dist/style.css on change
npm run dev:playground   # builds the stylesheet, then serves the demo site
npm run typecheck        # vue-tsc over the components and the config types
```

`src/index.ts` imports `dist/style.css`, so the stylesheet has to exist before anything can start;
both playground scripts build it first. Run `npm run dev` alongside to keep it rebuilding on change.

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
