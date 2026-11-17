# Getting started

The theme installs like any other VitePress theme: one package, one config wrapper, one import. It keeps the default theme underneath, so nothing you already rely on disappears.

## Install

```bash
npm install @frontfactory/vitepress-theme
```

Node 24 or later, `vitepress` 2 and `vue` 3.5 are required, and the last two stay in your own project as usual. The stylesheet is shipped compiled, so Sass is not needed.

## Wire the config

`extends: baseConfig` is required: it swaps the components the theme replaces, keeps the package out of dependency pre-bundling, injects the inline script that keeps a dismissed banner from painting in the built site, and reads each page's source for the copy-as-Markdown button.

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

The package ships its Vue and TypeScript sources as-is (`main`, `module` and `types` point at `src/index.ts`) and relies on Vite to compile them, which `extends: baseConfig` sets up. Tooling that type-checks outside Vite, such as `vue-tsc`, may need `skipLibCheck`. Importing `@frontfactory/vitepress-theme/config` from `.vitepress/config.ts`, as above, also makes `themeConfig.ff` known to TypeScript. For every option, see [Configuration](/guide/configuration).

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
