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

Props de `Card` :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `string` | requis | Titre de la carte ; c'est le lien quand `link` est renseigné. |
| `icon` | `string` | — | SVG en ligne ou emoji affiché au-dessus du titre. |
| `link` | `string` | — | Adresse vers laquelle pointe le titre ; sans elle, la carte est un simple bloc. |
| `rel` | `string` | — | Attribut `rel` du lien. |
| `target` | `string` | — | Attribut `target` du lien. |

Props de `CardGrid` :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `columns` | `number \| string` | `2` | Nombre de colonnes. |

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

Props de `Api` :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `name` | `string` | requis | Symbole documenté, p. ex. `refs()`. |
| `kind` | `string` | — | Libellé libre du genre, p. ex. `function`, `mixin`, `option`. |
| `signature` | `string` | — | Signature d'une ligne affichée sous le titre. |
| `since` | `string` | — | Version dans laquelle le symbole est apparu. |
| `deprecated` | `boolean` | — | Marque le symbole comme obsolète. |

## Encadrés

La même note qu'un conteneur `::: tip`, pour les endroits qu'un conteneur ne peut pas atteindre — à l'intérieur d'un autre
composant, ou avec un type lié à des données.

<Callout type="warning" title="Attention">

Les encadrés acceptent du Markdown, à condition qu'il soit séparé des balises par des lignes vides.

</Callout>

<Callout type="tip">

Sans `title`, c'est le type qui est affiché.

</Callout>

Props de `Callout` :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `type` | `string` | `'note'` | Parmi `tip`, `info`, `note`, `important`, `warning`, `danger`, `caution`. |
| `title` | `string` | — | Libellé affiché au-dessus du texte ; par défaut, le type. |

## Étapes

<Steps>

1. Déclarez vos jetons.
2. Émettez-les une seule fois, à la racine.
3. Référencez-les partout ailleurs.

</Steps>

## Onglets

Les groupes qui partagent une `syncKey` changent ensemble, et le choix est mémorisé. Le Markdown à l'intérieur d'un `<Tab>`
demande une ligne vide avant et après. Renseignez `ariaLabel` pour donner un nom accessible à la liste d'onglets.

<Tabs syncKey="pm" ariaLabel="Gestionnaire de paquets">
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

Props de `Tabs` :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `syncKey` | `string` | — | Les groupes qui partagent une clé changent ensemble, et le choix est mémorisé entre les visites. |
| `ariaLabel` | `string` | — | Nom accessible de la liste d'onglets. |

Props de `Tab` :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `label` | `string` | requis | Texte de l'onglet ; c'est aussi la valeur partagée entre les groupes de même `syncKey`. |

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

Props de `Timeline` :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `level` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Niveau de titre des entrées. |

Props de `TimelineItem` :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `date` | `string` | — | Date ou période, affichée en petit libellé à chasse fixe au-dessus du titre. |
| `title` | `string` | — | Titre de l'entrée. |

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

<Badge type="new" text="nouveau" /> <Badge type="beta" text="bêta" /> <Badge type="deprecated" text="obsolète" /> <Badge type="since" text="1.7.0" /> <Badge type="tip" text="astuce" />

`type="since"` affiche son texte à travers le libellé `apiSince` (par défaut `since {0}`, `depuis {0}` ici), donc `text="1.7.0"` affiche `depuis 1.7.0`. Les types natifs de VitePress `tip`, `info`, `warning` et `danger` fonctionnent toujours.

Props de `Badge` :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `text` | `string` | — | Texte du badge ; pour `since`, la version. |
| `type` | `string` | — | `tip`, `info`, `warning` et `danger` viennent de VitePress ; `new`, `beta`, `deprecated` et `since` du thème. |

## Touches

<Kbd>⌘</Kbd> <Kbd>K</Kbd> ouvre la boîte de recherche.
