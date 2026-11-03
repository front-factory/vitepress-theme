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

## Callouts

The same note as a `::: tip` container, for places a container cannot reach — inside another
component, or with a type bound to data.

<Callout type="warning" title="Heads up">

Callouts take Markdown, as long as it is separated from the tags by blank lines.

</Callout>

<Callout type="tip">

Without a `title`, the type is printed instead.

</Callout>

## Steps

<Steps>

1. Declare your tokens.
2. Emit them once, at the root.
3. Reference them everywhere else.

</Steps>

## Keys

<Kbd>⌘</Kbd> <Kbd>K</Kbd> opens the search dialog.
