# Prise en main

Le thème s'installe comme n'importe quel thème VitePress : un paquet, une enveloppe de configuration, un import. Il conserve le thème par défaut en dessous, donc rien de ce sur quoi vous comptez ne disparaît.

## Installation

```bash
npm install @frontfactory/vitepress-theme
```

Node 24 ou plus récent est requis, et `vitepress` et `vue` restent dans votre propre projet comme d'habitude.

## Brancher la configuration

`extends: baseConfig` apporte les remplacements de composants et les réglages Vite dont le thème a besoin.

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

## Utiliser le thème

```ts
// .vitepress/theme/index.ts
import Theme from '@frontfactory/vitepress-theme'

export default Theme
```

::: tip
Le prolonger se fait comme pour le thème par défaut : étalez-le, puis ajoutez votre propre `Layout` ou `enhanceApp`.
:::

## Étapes

<Steps>

1. Installez le paquet.
2. Ajoutez `extends: baseConfig` à la configuration.
3. Réexportez le thème depuis `.vitepress/theme/index.ts`.
4. Réglez votre couleur d'accent et publiez.

</Steps>

## Touches à connaître

Appuyez sur <Kbd>⌘</Kbd> <Kbd>K</Kbd> pour rechercher, sur <Kbd>Esc</Kbd> pour fermer.
