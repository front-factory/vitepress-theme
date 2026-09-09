# Getting started

The theme installs like any other VitePress theme: one package, one config wrapper, one import. It keeps the default theme underneath, so nothing you already rely on disappears.

## Install

```bash
npm install @frontfactory/vitepress-theme
```

Node 20 or later is required, and `vitepress` and `vue` stay in your own project as usual.

## Wire the config

`extendConfig` injects the component swaps and the Vite settings the theme needs.

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

## Use the theme

```ts
// .vitepress/theme/index.ts
import Theme from '@frontfactory/vitepress-theme'

export default Theme
```

::: tip
Extending it further works the same way as extending the default theme — spread it, then add your own `Layout` or `enhanceApp`.
:::

## Steps

<Steps>

1. Install the package.
2. Wrap the config with `extendConfig`.
3. Re-export the theme from `.vitepress/theme/index.ts`.
4. Set your accent colour and ship.

</Steps>

## Keys worth knowing

Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search, <Kbd>Esc</Kbd> to close.
