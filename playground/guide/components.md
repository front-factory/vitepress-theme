# Components

Five components are registered globally, so any page can use them without an import.

## Cards

<CardGrid :columns="2">
<Card title="Tokens" link="/guide/configuration">
Every value is a custom property. Override the accent and stop there.
</Card>
<Card title="Counters">
Sections, features and steps number themselves from the stylesheet.
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

## Steps

<Steps>

1. Declare your tokens.
2. Emit them once, at the root.
3. Reference them everywhere else.

</Steps>

## Keys

<Kbd>⌘</Kbd> <Kbd>K</Kbd> opens the search dialog.
