# Feature: Docs dedup and page actions (branch develop)

Date: 2026-11-17
Last commit: 804d9a6
Base branch: develop

## Goal

Lighter, clearer docs (short README, playground as the single reference); remove code duplication in `src/` and `node/`; show the "Copy link" page action by default; harmonise "Last updated" and "Edit this page" styling in the doc footer.

## Design

Chosen approach: work directly on `develop` (confirmed by the user, no new branch). `pageActions` undefined => `{ copyLink: true }`; `false` disables; `true` = all; object form keeps explicit flags. Markdown and share stay opt-in. README keeps intro, playground link, Install, minimal Use, Developing locally, Publishing, Licence; everything else links to the playground. Dedup is behaviour-preserving.
Out of scope: new page actions, changes to the blog or og features, new options.

## Steps

Checks common to code steps: `npm run typecheck`, `npm run lint`, `npm run build:playground` (must still build; output unchanged).

- [x] 1. refactor: `resolvePageActions(ff)` pure function in `node/` (pattern of `node/blog.js`, add `.d.ts` if needed), used by `config.js:~51` and `src/components/FfDocMeta.vue:~197` — files: node/page-actions.js (new), config.js, src/components/FfDocMeta.vue — check: `npm run typecheck && npm run lint`, playground page actions menu unchanged
- [x] 2. refactor: `resolveOption(value, optOut?)` (true -> {}, object as is, false/opt-out -> null) for `src/components/FfFeedback.vue:~12`, `src/components/FfDocMeta.vue:~19`, `node/rss.js:~16`, `node/pages.js:~147` — files: node/options.js (new), src/components/FfFeedback.vue, src/components/FfDocMeta.vue, node/rss.js, node/pages.js (5 files) — check: `npm run typecheck && npm run lint && npm run build:playground`
- [x] 3. refactor: `requireHostname(siteConfig, explicit, optionPath)` next to `hostnameOf` in `node/pages.js`, used by `node/pages.js:~147-156` and `node/rss.js:~17-23` — files: node/pages.js, node/rss.js — check: `npm run lint && npm run build:playground`, same error messages when hostname is missing
- [x] 4. refactor: `isPostPath` and `resolveAuthor` in `node/blog.js` (note: `resolveAuthor` already exists in `src/composables/blog.ts:29`), used by `src/composables/blog.ts:~15-30`, `node/rss.js:~50-54`, `src/blog/posts.data.ts:~28-34` — files: node/blog.js, node/blog.d.ts, src/composables/blog.ts, node/rss.js, src/blog/posts.data.ts (5 files) — check: `npm run typecheck && npm run build:playground`, blog list and RSS identical
- [x] 5. refactor: `firstHeading(body)` and `toTags(value)` in `node/blog.js`, used by `node/pages.js:~119`, `src/blog/posts.data.ts:~37-40`, `node/llms.js:~20`, `node/rss.js:~67`, `src/components/FfPost.vue:~16` — files: node/blog.js, node/blog.d.ts, node/pages.js, node/llms.js, node/rss.js (+ posts.data.ts, FfPost.vue: split in two commits if over 5 files) — check: `npm run typecheck && npm run lint && npm run build:playground`
- [x] 6. refactor: `config.js:~61` reuses `parseSource(source).body` (or an exported regex) from `node/pages.js`; banner key/class shared between `config.js:~120,126` and `src/components/FfBanner.vue:~17,37` via a small `node/banner.js` — files: config.js, node/pages.js, node/banner.js (new), src/components/FfBanner.vue — check: `npm run typecheck && npm run build:playground`, banner dismiss still works
- [x] 7. refactor: composables `useTransientFlag(ms = 2000)` (`src/composables/copy.ts:~24`, `src/components/FfCopyStatus.vue:~15`) and `useFrameListener` (`src/components/FfBackToTop.vue:~25`, `src/components/FfProgress.vue:~22`) — files: src/composables/copy.ts, src/components/FfCopyStatus.vue, src/components/FfBackToTop.vue, src/components/FfProgress.vue (+ new composable file; split `useFrameListener` into its own commit if over 5 files) — check: `npm run typecheck && npm run lint`
- [ ] 8. refactor(styles): `copy-button` / `copied-flag` mixins in `src/styles/_mixins.scss`, used by `src/styles/_code.scss:~46-73` and `src/styles/_home.scss:~259-300` — files: src/styles/_mixins.scss, src/styles/_code.scss, src/styles/_home.scss — check: `npm run lint:css && npm run build:css`, compiled `dist/style.css` rules equivalent
- [ ] 9. feat: copy link by default in `resolvePageActions` + JSDoc in `src/types.ts:~239` — files: node/page-actions.js, src/types.ts — check: `npm run typecheck`; with `pageActions` undefined the menu shows "Copy link" only, `false` hides it
- [ ] 10. style: harmonise `.last-updated` and `.edit-link-button` in `src/styles/_doc.scss:~306-316` (same font, size, weight, line-height, baseline; `<time>` inherits) — files: src/styles/_doc.scss — check: `npm run lint:css && npm run build:css`, then one visual pass on the doc footer only
- [ ] 11. docs: shorten `README.md` per the design — files: README.md — check: sections limited to the kept list, every removed topic reachable via a playground link
- [ ] 12. docs: restructure `playground/guide/configuration.md` (options table first, drop the big all-options block, grouped sections, one shared "Custom build hooks" subsection replacing the three repeated `ffTransformPageData` / `ffBuildEnd` / `ffTransformHead` snippets, document the new `pageActions` default); link from `playground/guide/getting-started.md` instead of repeating wiring; no `playground/fr/guide/configuration.md` exists, so no mirror — files: playground/guide/configuration.md, playground/guide/getting-started.md — check: `npm run build:playground` (dead links fail the build)

## Decisions and open questions

- Work stays on `develop` (user confirmed).
- Steps 5 and 7 may exceed 5 files: split into two commits at implementation time.

## Notes

- New `node/` modules are covered by `package.json` `files` (`"node"` is listed); `exports` only exposes `.`, `./config`, `./style.css`, so `node/*` stays internal and is reached through `config.js` imports. Components in `src/` importing from `node/` must stay type-safe and browser-safe (no Node APIs): prefer pure functions only.
- Scripts: `build`, `build:css`, `build:types`, `build:playground`, `typecheck`, `lint`, `lint:js`, `lint:css`, `test:e2e`. No unit test script.
