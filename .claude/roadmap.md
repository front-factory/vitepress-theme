# Roadmap : nouvelles features

Référence entre deux sessions. Mettre à jour ce fichier à la fin de chaque phase.

## Fait

### Phase 0 : fondations (commits a04a666, 13d9e19, 97c38cc ; docs 53fb599, 2efc9ee)

**14. Breakpoints**
- `src/styles/_breakpoints.scss` définit `sm 640`, `md 960` et `lg 1280`, avec les mixins `bp.up()` / `bp.down()`.
- Le CSS compilé est identique à celui d'avant le refactor.

**13. Motion**
- Seul `--ff-motion-duration-enter` (650ms) a été ajouté. Les tokens `ease-in/out/emphasized` et `duration-fast` ont été écartés : aucun code ne les utiliserait.
- Restent en dur : 0.8s (panneau du hero), 0.9s (image du hero), 26s (glow).

**15. Presets d'accent**
- `ff.preset` accepte `emerald`, `crimson`, `violet` ou `amber`. La map `$presets` est dans `_tokens.scss`.
- Le script inline posé par `transformHead` dans `config.js` met `data-ff-preset` sur `<html>`.
- Contrastes vérifiés : tous ≥ 5,1:1.
- Le preset l'emporte sur un `--ff-color-accent` défini sur `:root`, car son sélecteur est plus spécifique.
- Le preset est commun à tout le site, sans variation par locale.

### Phase 1 : composants Markdown (commits 928e3b0, ef532d6, ecb0aff, f252ec6, 00fca33, 0ed25c0)

**1. Callout** (928e3b0)
- Construit sur le CSS `.custom-block` existant.

**2. Tabs + Tab** (ef532d6 refactor, ecb0aff feat)
- `src/composables/tabs.ts` expose `useTabs(labels, syncKey?)` et `useCopy(text)`, repris par `FfHeroCommand.vue`.
- `Tabs` lit les `Tab` depuis le slot (pas d'enregistrement au setup) : sinon la liste des onglets serait vide en SSR.
- Sync par libellé (map réactive au niveau du module + localStorage + événement `storage`), lue dans `onMounted`.
- Le markdown dans un `<Tab>` demande des lignes vides autour. L'anneau de focus vient de la règle globale de `_base.scss`.

**3. Badge** (f252ec6)
- `src/content/Badge.vue` enveloppe `VPBadge` (export ajouté à `internal.ts`) ; `type="since"` affiche `labels.apiSince`.
- `enhanceApp` supprime d'abord le `Badge` de DefaultTheme (`delete app._context.components.Badge`) pour éviter l'avertissement Vue.
- Variantes `new`, `beta`, `deprecated` (barré), `since` dans `_blocks.scss`. Cast de `type` : VPBadge le type en union fermée.

**4. FileTree** (00fca33)
- Composant à render function : parcourt les vnodes du `ul` en slot ; dossier = `/` final ou `ul` imbriqué. Le `/` est retiré puis réaffiché en CSS.
- Testé avec un arbre de 30 entrées (pas de vnode statique stringifié) et un nom en `code`.

**5. Timeline + TimelineItem** (0ed25c0)
- Rail sur le modèle de `.ff-steps`, marqueur carré ; props `date` et `title` sur l'item.

### Phase 2 : chrome de page (commits e524519, 4efd586, 5de1450, 2ff9899, fd26deb)

**6. FfProgress** (e524519)
- Opt-in via `ff.progress`, frontmatter `progress: false`. Barre fixe de 2px en `scaleX`, z-index = `layout-top` + 1. Mêmes écouteurs que `FfBackToTop`, plus `resize`.

**7. FfFeedback** (4efd586)
- `ff.feedback: boolean | { url?, question? }`, frontmatter `feedback: false`. Slot `doc-footer-before` ajouté à `owned`.
- Payload envoyé en chaîne via `sendBeacon` (seulement si `url`) ; l'événement `ff:feedback` part toujours. Type `FeedbackConfig` exporté.

**8a. Copier en Markdown** (5de1450)
- `config.js` exporte `ffTransformPageData` (typé dans `config.d.ts`) et le branche par défaut ; le playground l'appelle depuis son propre `transformPageData`.
- Sans `ff.copyMarkdown`, le helper ne fait rien. Il renvoie `{ ffMarkdown }` (fusionné par VitePress) au lieu de muter `pageData`.
- Bouton dans `FfDocMeta` (hors `ClientOnly`), `heroCopied` réutilisé pour l'état copié ; le bloc reste affiché avec `meta: false` si le bouton est actif.

**9. Print** (2ff9899)
- `_print.scss`, tout dans `@media print`, chargé en dernier. Le diff de `dist/style.css` se limite à ce bloc.
- `-accent()` de `_tokens.scss` renommée `preset-colors()` (publique, nécessaire au `@use`), sans effet sur le CSS.
- Shiki repasse sur `--shiki-light` via `:root.dark .shiki span`. Les variables `--vp-*` non reliées à nos tokens restent sombres : non vérifié visuellement.

**11. FfVersionSwitcher** (fd26deb)
- `ff.versions: { current, items }` rendu par `VPFlyout` (export ajouté à `internal.ts`), pas de `link.ts`.
- Placé à côté du titre : `FfNavBarTitle.vue` remplace `VPNavBarTitle` (map `overrides`), car le slot `nav-bar-title-after` est dans le `<a>` du titre. Pastille mono encadrée, menu ouvert depuis la gauche.
- Le menu `pkg.version` du playground est remplacé par `ff.versions`. Visible aussi sous le breakpoint mobile (non vérifié visuellement).

### Phase 3 : build et layouts (commits 2cf68f8, 667dbda, 6025542, b6c2491 ; deps 198d81e, ddbb95e, 5e8fefa, 6e318d1)

**Hooks chaînables** : `config.js` exporte `ffBuildEnd` et `ffTransformHead` (typés dans `config.d.ts`), branchés par défaut ; implémentations Node en JS pur dans `node/` (`pages.js`, `llms.js`, `rss.js`, `og.js`), ajouté à `files`. `pages.js` lit les pages avec un parseur de frontmatter minimal (scalaires, listes plates), sans dépendance.

**12. Layout wide** (2cf68f8)
- Frontmatter `wide: true` (et non `layout: api`) : `FfLayout.vue` pose `data-layout="wide"` sur `.ff-theme`. CSS dans `_doc.scss` : largeur `layout-wide`, aside masqué. Page démo `playground/guide/wide.md`. Vérifié visuellement (1 passe).

**8b. llms.txt** (667dbda)
- `ff.llms`, frontmatter `llms: false`. URLs avec `base`, `cleanUrls`, `rewrites` et préfixe `sitemap.hostname`. `llms-full.txt` ajoute un titre seulement si le corps n'a pas de `# `.

**10. Blog** (6025542 ; deps 198d81e, ddbb95e : `feed` en peer optionnelle puis devDependency)
- `ff.blog: { dir, authors, rss }`. `src/blog/posts.data.ts` (`createContentLoader`) lit `dir` dans `globalThis.VITEPRESS_CONFIG` ; un `.data.ts` livré dans le thème est bien repéré par le plugin de données (testé via le playground lié, import `../types.ts` avec extension pour éviter l'avertissement du loader natif).
- `FfBlog.vue` enregistré sous le nom `blog` (règle ESLint désactivée sur cette ligne) ; `FfPost.vue` dans `doc-before` ; libellés `blogBy`, `blogEmpty`. RSS `feed.xml` dans `ffBuildEnd`, lien alternate dans `ffTransformHead`.
- Vérifié visuellement (index et en-tête d'article). L'en-tête d'article a ensuite été corrigé (rule du kicker fusionnée, `display: flex`) sans seconde passe visuelle.

**16. Images OG** (b6c2491 ; deps 5e8fefa, 6e318d1 : `satori` et `@resvg/resvg-js`)
- `ff.og: { fonts, hostname? }` (`true` seul refusé : satori exige une police), frontmatter `og: false`. PNG 1200x630 dans `og/<chemin-aplati>.png`, rendu séquentiel ; `boxSizing: 'border-box'` indispensable (satori est en content-box).
- Tags `og:image`, `og:title`, `og:description`, `twitter:card` ; le meta `twitter:card summary` du playground est supprimé. Police du playground : JetBrains Mono (OFL) dans `playground/.vitepress/fonts/`.

### Phase 4 : playground et CI (commits 4146710, 0599915 ; deps f785bd1 : `@playwright/test` et `@axe-core/playwright`)

**17. i18n** (4146710)
- `locales: { root, fr }` dans le config du playground ; `ff` n'est pas dupliqué, seuls `ff.labels` et `ff.footerColumns` le sont dans `fr`. Pages miroirs : `fr/index`, `team`, `guide/getting-started`, `components`, `wide`.
- Fusion des tableaux par index (proxy `stackView`) : `sidebar` racine passé en objet par chemin (`'/fr/'`, `'/'`) ; `nav` FR de même longueur que l'anglais (le lien Blog pointe vers `/blog/` anglais) ; `footerColumns` FR de même forme.
- Libellé `Version` conservé dans le hero FR, donc `transformPageData` l'atteint. Vérifié dans le HTML généré : aucune entrée anglaise de nav, sidebar ou footer sur `/fr/`. La bannière reste en anglais. Recherche locale non traduite.

**18. CI** (0599915)
- `playwright.config.ts` (Chromium, `vitepress preview` sur 4173, `reducedMotion`), `tests/a11y.spec.ts` (14 pages, tags wcag2a/aa, wcag21a/aa). Script `test:e2e` (seul `tests/a11y.spec.ts` existe ; les tests visuels ont été abandonnés). `tsconfig` inclut config et tests ; `process` déclaré à la main (pas de `@types/node`).
- Job `e2e` hors `publish.needs`.
- Violations axe corrigées (cb99507, e8a59e4) : lignes `.diff.remove` remises à `opacity: 1` (le 0.7 du thème par défaut cassait le contraste) ; nom accessible du sélecteur de version = `labels.versionSwitcher` + `current`. `test:e2e` passe localement (14/14), avec le `webServer` lancé par Playwright (l'`ERR_CONNECTION_REFUSED` d'avant ne s'est pas reproduit).

## Reste à faire

Rien : toutes les phases sont faites.

## Conventions

- Avancer une phase à la fois, sur demande.
- Un commit par point. Les commits de dépendances sont séparés : `build(deps)` / `build(deps-dev)`.
- Vérifications : `npm run lint`, `npm run typecheck`, `npm run build:css`, `npm run build:playground`.
- Mettre à jour la doc (README + `playground/guide/configuration.md`) pour chaque nouvelle option.
