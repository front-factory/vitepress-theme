# Components

These components are registered globally, so any page can use them without an import.

## Cards

<CardGrid :columns="2">
<Card title="Tokens" link="/guide/configuration">
Every value is a custom property. Override the accent and stop there.
</Card>
<Card title="Counters">
Sections, features and steps number themselves from the stylesheet.
</Card>
</CardGrid>

`Card` also takes an `icon` (inline SVG or emoji), and `CardGrid` any column count:

<CardGrid :columns="3">
<Card title="Search" icon="🔍" link="/guide/getting-started">
Local search, unchanged from the default theme.
</Card>
<Card title="i18n" icon="🌍">
Locales stay the default theme's own mechanism.
</Card>
<Card title="Mobile nav" icon="📱">
Hamburger and full-screen menu, untouched.
</Card>
</CardGrid>

`Card` props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Title of the card; it is the link when `link` is set. |
| `icon` | `string` | — | Inline SVG or emoji shown above the title. |
| `link` | `string` | — | Address the title links to; without it the card is a plain block. |
| `rel` | `string` | — | `rel` attribute of the link. |
| `target` | `string` | — | `target` attribute of the link. |

`CardGrid` props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `number \| string` | `2` | Number of columns. |

## API entries

<Api name="refs()" kind="function" signature="refs($tokens, $namespace: null) => Map" since="5.0">

Turns a token map into `var()` references. Nested maps are walked recursively, and the namespace is
prefixed to each generated name.

</Api>

<Api name="emit()" kind="mixin" signature="emit($tokens, $namespace: null, $layer: null)">

Declares the custom properties for a token map.

</Api>

<Api name="theme-vars()" kind="function" deprecated>

Replaced by `refs()`.

</Api>

`Api` props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Symbol being documented, e.g. `refs()`. |
| `kind` | `string` | — | Free-form kind label, e.g. `function`, `mixin`, `option`. |
| `signature` | `string` | — | One-line signature shown under the heading. |
| `since` | `string` | — | Version the symbol appeared in. |
| `deprecated` | `boolean` | — | Marks the symbol as deprecated. |

## Callouts

The same note as a `::: tip` container, for places a container cannot reach — inside another
component, or with a type bound to data.

<Callout type="warning" title="Heads up">

Callouts take Markdown, as long as it is separated from the tags by blank lines.

</Callout>

<Callout type="tip">

Without a `title`, the type is printed instead.

</Callout>

`Callout` props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'note'` | One of `tip`, `info`, `note`, `important`, `warning`, `danger`, `caution`. |
| `title` | `string` | — | Label printed above the text; defaults to the type. |

## Steps

<Steps>

1. Declare your tokens.
2. Emit them once, at the root.
3. Reference them everywhere else.

</Steps>

## Tabs

Groups sharing a `syncKey` switch together, and the choice is remembered. Markdown inside a `<Tab>`
needs a blank line before and after it. Set `ariaLabel` to give the tab list an accessible name.

<Tabs syncKey="pm" ariaLabel="Package manager">
<Tab label="npm">

```sh
npm install @frontfactory/vitepress-theme
```

</Tab>
<Tab label="pnpm">

```sh
pnpm add @frontfactory/vitepress-theme
```

</Tab>
</Tabs>

<Tabs syncKey="pm">
<Tab label="npm">

```sh
npm run docs:dev
```

</Tab>
<Tab label="pnpm">

```sh
pnpm docs:dev
```

</Tab>
</Tabs>

`Tabs` props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `syncKey` | `string` | — | Groups sharing a key switch together, and the choice is remembered across visits. |
| `ariaLabel` | `string` | — | Accessible name of the tab list. |

`Tab` props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Text of the tab; also the value shared between groups with the same `syncKey`. |

## Timeline

Entry titles are `<h3>` by default. Set `level` on `<Timeline>` (2 to 6) to fit the surrounding outline.

<Timeline>
<TimelineItem date="2026" title="Components">

Callouts, tabs, badges, file trees and timelines.

</TimelineItem>
<TimelineItem date="2025" title="Accent presets">

Four ready-made accents behind a single option.

</TimelineItem>
</Timeline>

`Timeline` props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Heading level of the entry titles. |

`TimelineItem` props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `date` | `string` | — | Date or period, printed as a small monospaced label above the title. |
| `title` | `string` | — | Heading of the entry. |

## File tree

A trailing `/` or nested items mark a folder.

<FileTree>

- src/
  - components/
    - FfHeader.vue
    - FfFooter.vue
  - styles/
    - _tokens.scss
    - index.scss
  - index.ts
- package.json
- README.md

</FileTree>

## Badges

<Badge type="new" text="new" /> <Badge type="beta" text="beta" /> <Badge type="deprecated" text="deprecated" /> <Badge type="since" text="1.7.0" />

`Badge` props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text of the badge; for `since`, the version. |
| `type` | `string` | — | `tip`, `info`, `warning` and `danger` come from VitePress; `new`, `beta`, `deprecated` and `since` from the theme. |

## Keys

<Kbd>⌘</Kbd> <Kbd>K</Kbd> opens the search dialog.
