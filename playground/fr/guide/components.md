# Composants

Ces composants sont enregistrés globalement : n'importe quelle page peut les utiliser sans import.

## Cartes

<CardGrid :columns="2">
<Card title="Jetons" link="/guide/configuration">
Chaque valeur est une propriété personnalisée. Surchargez l'accent et arrêtez-vous là.
</Card>
<Card title="Compteurs">
Les sections, fonctionnalités et étapes se numérotent depuis la feuille de style.
</Card>
</CardGrid>

`Card` accepte aussi une `icon` (SVG en ligne ou emoji), et `CardGrid` n'importe quel nombre de colonnes :

<CardGrid :columns="3">
<Card title="Recherche" icon="🔍" link="/fr/guide/getting-started">
Recherche locale, inchangée par rapport au thème par défaut.
</Card>
<Card title="i18n" icon="🌍">
Les langues restent le mécanisme propre au thème par défaut.
</Card>
<Card title="Navigation mobile" icon="📱">
Menu hamburger et menu plein écran, intacts.
</Card>
</CardGrid>

## Entrées d'API

<Api name="refs()" kind="function" signature="refs($tokens, $namespace: null) => Map" since="5.0">

Transforme une map de jetons en références `var()`. Les maps imbriquées sont parcourues récursivement, et l'espace de noms
est préfixé à chaque nom généré.

</Api>

<Api name="emit()" kind="mixin" signature="emit($tokens, $namespace: null, $layer: null)">

Déclare les propriétés personnalisées d'une map de jetons.

</Api>

<Api name="theme-vars()" kind="function" deprecated>

Remplacée par `refs()`.

</Api>

## Encadrés

La même note qu'un conteneur `::: tip`, pour les endroits qu'un conteneur ne peut pas atteindre — à l'intérieur d'un autre
composant, ou avec un type lié à des données.

<Callout type="warning" title="Attention">

Les encadrés acceptent du Markdown, à condition qu'il soit séparé des balises par des lignes vides.

</Callout>

<Callout type="tip">

Sans `title`, c'est le type qui est affiché.

</Callout>

## Étapes

<Steps>

1. Déclarez vos jetons.
2. Émettez-les une seule fois, à la racine.
3. Référencez-les partout ailleurs.

</Steps>

## Onglets

Les groupes qui partagent une `syncKey` changent ensemble, et le choix est mémorisé. Le Markdown à l'intérieur d'un `<Tab>`
demande une ligne vide avant et après.

<Tabs syncKey="pm">
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

## Chronologie

Les titres des entrées sont des `<h3>` par défaut. Réglez `level` sur `<Timeline>` (de 2 à 6) pour suivre le plan de la page.

<Timeline>
<TimelineItem date="2026" title="Composants">

Encadrés, onglets, badges, arborescences et chronologies.

</TimelineItem>
<TimelineItem date="2025" title="Préréglages d'accent">

Quatre accents prêts à l'emploi derrière une seule option.

</TimelineItem>
</Timeline>

## Arborescence

Une `/` finale ou des éléments imbriqués indiquent un dossier.

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

<Badge type="new" text="nouveau" /> <Badge type="beta" text="bêta" /> <Badge type="deprecated" text="obsolète" /> <Badge type="since" text="1.7.0" />

## Touches

<Kbd>⌘</Kbd> <Kbd>K</Kbd> ouvre la boîte de recherche.
