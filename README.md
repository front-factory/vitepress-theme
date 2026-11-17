# @frontfactory/vitepress-theme

[![Version](https://flat.badgen.net/npm/v/@frontfactory/vitepress-theme)](https://www.npmjs.com/package/@frontfactory/vitepress-theme)
[![Downloads](https://flat.badgen.net/npm/dt/@frontfactory/vitepress-theme)](https://www.npmjs.com/package/@frontfactory/vitepress-theme)
[![License](https://flat.badgen.net/npm/license/@frontfactory/vitepress-theme)](https://www.npmjs.com/package/@frontfactory/vitepress-theme)

Editorial VitePress theme — hairline rules, numbered sections and monospaced metadata. One accent
token to make it yours.

It extends the VitePress default theme rather than forking it: search, i18n, mobile navigation and
every markdown feature keep working, while the whole surface is redrawn.

## Playground

Try it live on StackBlitz — no installation required:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/~/github.com/front-factory/vitepress-theme?startScript=dev:playground)

Or run it locally with `npm run dev:playground`.

## Install

```bash
npm install @frontfactory/vitepress-theme
```

Requires Node 24+, `vitepress` 2 and `vue` 3.5 in the host project. Nothing else — the stylesheet is
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

`extends: baseConfig` is required: it swaps the components the theme replaces and wires the build
hooks the theme relies on.

## Documentation

The playground is the reference. Each page below is the source of a page of the demo site:

- [Getting started](https://github.com/front-factory/vitepress-theme/blob/main/playground/guide/getting-started.md): install, wiring and the keys worth knowing.
- [Configuration](https://github.com/front-factory/vitepress-theme/blob/main/playground/guide/configuration.md): `themeConfig.ff` options, rebranding, translating, printing, page actions, llms.txt, blog and Open Graph images, plus the [home page](https://github.com/front-factory/vitepress-theme/blob/main/playground/guide/configuration.md#home-page) frontmatter.
- [Components](https://github.com/front-factory/vitepress-theme/blob/main/playground/guide/components.md): cards, callouts, tabs, timeline, file tree and the other markdown components.
- [Markdown](https://github.com/front-factory/vitepress-theme/blob/main/playground/guide/markdown.md): blocks, code, tables and the rest of the markdown styling.
- [Blog](https://github.com/front-factory/vitepress-theme/blob/main/playground/blog/index.md): a blog index and posts, as configured in the playground.

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
