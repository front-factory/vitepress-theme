# Markdown

Every markdown feature of the default theme is left untouched — only its clothes change.

## Blocks

::: info
An informational note, ruled rather than boxed.
:::

::: tip
The accent colour marks anything advisory.
:::

::: warning
Amber for things that bite later.
:::

::: danger
Red for things that bite now.
:::

::: details What sits behind a collapsible
Collapsibles keep a frame: they are objects on the page, not asides.
:::

GitHub's alert syntax renders through the same custom-block styling:

> [!NOTE]
> Same rule, same label — just a different way to write it.

> [!TIP]
> Useful for content pasted in from a README.

> [!IMPORTANT]
> Key information readers need to notice.

> [!WARNING]
> Urgent info needing immediate attention.

> [!CAUTION]
> Advises about risks or negative outcomes.

## Code

```scss
@use 'magnesium' as mg;

$tokens: (
    'color': (
        'accent': #2745cf
    )
);

:root {
    @include mg.emit($tokens);
}
```

```ts
const accent: string = 'var(--ff-color-accent)'
```

Lines can be highlighted, dimmed into focus, or annotated as an error, a warning, or a diff — all
inherited from the default theme, unstyled by this one:

```ts{2}
function emit(tokens) {
    return refs(tokens)
}
```

```ts
function emit(tokens) { // [!code focus]
    return refs(tokens) // [!code focus]
}
```

```ts
function emit(tokens) {
    return refs(tokens) // [!code error]
    return tokens // [!code warning]
}
```

```ts
function emit(tokens) {
    return tokens // [!code --]
    return refs(tokens) // [!code ++]
}
```

::: code-group

```bash [npm]
npm install @frontfactory/vitepress-theme
```

```bash [pnpm]
pnpm add @frontfactory/vitepress-theme
```

```bash [yarn]
yarn add @frontfactory/vitepress-theme
```

:::

## Tables

| Property | Type | Default |
| --- | --- | --- |
| `banner` | `BannerConfig` | — |
| `meta` | `MetaConfig \| false` | `true` |
| `backToTop` | `boolean` | `true` |
| `footerColumns` | `FooterColumn[]` | `[]` |
| `footerSocial` | `boolean` | `true` |

## Quotes

> Typography is what language looks like when it is standing still.

## Lists

- Hairlines instead of shadows.
- Monospace for anything that is data rather than prose.
- One accent, used sparingly.

1. Read the tokens.
2. Override the accent.
3. Ship.

## Badges

Heading with a badge <Badge type="tip" text="new" /> and another <Badge type="warning" text="beta" />.

## Links

An [internal link](/guide/configuration), an [external one](https://vitepress.dev), and some `inline code`.
