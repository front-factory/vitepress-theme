# Getting started

The theme installs like any other VitePress theme: one package, one config wrapper, one import. It keeps the default theme underneath, so nothing you already rely on disappears.

## Install

```bash
npm install @frontfactory/vitepress-theme
```

Node 24 or later, `vitepress` `^2.0.0-alpha.20`, `vue` 3.5 and `vite` 8 are required, and the last three stay in your own project as usual. The stylesheet is shipped compiled, so Sass is not needed.

Some options need an optional peer dependency, installed only when you use them:

- `feed`: the blog RSS feed (`blog.rss`).
- `satori` and `@resvg/resvg-js`: Open Graph images (`og`).

## Wire the config

`extends: baseConfig` is required: it swaps the components the theme replaces, keeps the package out of dependency pre-bundling, injects the inline script that keeps a dismissed banner from painting in the built site, reads each page's source for the [page actions](/guide/configuration#page-actions) menu (only "Copy link" is on by default), and wires the hooks behind [llms.txt](/guide/configuration#llms-txt), [Open Graph images](/guide/configuration#open-graph-images) and the [blog](/guide/configuration#blog) RSS feed, all off until you enable them.

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

The package ships `src/index.ts` as source (`exports["."]`), compiled by Vite, which `extends: baseConfig` sets up. Type declarations ship in `types/`, generated at pack time. Importing `@frontfactory/vitepress-theme/config` from `.vitepress/config.ts`, as above, also makes `themeConfig.ff` known to TypeScript. For every option, see [Configuration](/guide/configuration).

## Use the theme

```ts
// .vitepress/theme/index.ts
import Theme from '@frontfactory/vitepress-theme'

export default Theme
```

::: tip
`@frontfactory/vitepress-theme/style.css` is exported for tooling that needs the stylesheet on its own; the theme entry already imports it.

Extending it further works the same way as extending the default theme — spread it, then add your own `Layout` or `enhanceApp`.
:::

## Steps

<Steps>

1. Install the package.
2. Add `extends: baseConfig` to the config.
3. Re-export the theme from `.vitepress/theme/index.ts`.
4. Set your accent colour and ship.

</Steps>

## Keys worth knowing

Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search, <Kbd>Esc</Kbd> to close.
