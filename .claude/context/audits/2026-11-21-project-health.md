# Audit: project health

Date: 2026-11-21
Baseline commit: 1d66846
Scope: Whole project: tooling/config, library src/ and node/, playground docs, roadmap
Status: open

## Findings

| ID | Severity | File | Problem | Status | Notes (commit / reason) |
|----|----------|------|---------|--------|-------------------------|
| T1 | medium | .github/dependabot.yml | No ignore rule for conventional-changelog-conventionalcommits semver-major; v10 PRs will keep coming although v9 is pinned on purpose (semantic-release writer@8). | fixed | |
| T2 | low | .github/dependabot.yml | Only npm ecosystem; GitHub Actions never updated (upload-artifact@v4 next to checkout/setup-node@v6 in ci.yml). | fixed | |
| T3 | low | release.config.js:8 | Maintenance branches N.x / N.N.x declared but CI never runs or publishes on them. Decision: remove them. | fixed | |
| T4 | low | package.json | vite is a required peer imported by config.js and tsconfig types but missing from devDependencies. | fixed | |
| D1 | medium | playground/guide/getting-started.md:31 | Claims main/module/types point at src/index.ts; package.json has no main/module, types is ./types/index.d.ts; skipLibCheck advice outdated. | fixed | |
| D2 | low | playground/guide/getting-started.md:15 | Mentions copy-as-Markdown button (now page actions menu, off by default since 1.10.0); omits llms, OG and RSS hooks wired by extends. | fixed | |
| D3 | low | README.md:27, playground/guide/getting-started.md:11 | Requirements omit vite 8 (required peer since 1.8.0). | fixed | |
| D4 | low | playground/fr/guide/getting-started.md:11 | FR page drops vitepress 2 / vue 3.5 versions and the "Sass is not needed" note present in EN. | fixed | |
| D5 | low | playground/guide/configuration.md:387-415 | Labels table misses apiSince, apiDeprecated, bannerCta (present in src/types.ts and src/composables/options.ts). | fixed | |
| D6 | low | playground/guide/configuration.md:198-256 | Themed sponsors section (FfHomeSponsors, swapped in config.js:24) not documented. | fixed | |
| D7 | medium | .claude/roadmap.md:98-105 | Describes tests/visual.spec.ts, test:visual script and workflow_dispatch update-snapshots that no longer exist. Decision: update roadmap, visual tests dropped. | fixed | |
| L1 | medium | src/content/Card.vue:16-33 | Whole card is one link, so the body becomes the link's accessible name; icon span lacks aria-hidden (FfFeature.vue already fixed this pattern). | fixed | |
| L2 | low | src/components/FfDocMeta.vue:246,371-402 | Page actions menu button lacks aria-controls; opening does not move focus into the menu. | fixed | |
| L3 | low | src/content/Tabs.vue:60-64 | Tablist has no accessible name. | fixed | |
| L4 | low | node/blog.js:61, src/components/FfPost.vue:47, FfBlog.vue:38, FfHero.vue:207, FfFooter.vue:60 | Possible duplicate v-for keys (tags not deduped, label/title keys not unique). | fixed | |
| L5 | low | src/styles/_content.scss:241 | Focus ring uses var(--vp-c-brand-1) and raw 2px instead of color-accent token and rule-accent-width like _base.scss:51. | fixed | |
| L6 | low | src/index.ts:36 | Relies on Vue private app._context to unregister Badge. | deferred | Out of scope. |
| L7 | low | src/styles/_tokens.scss | No spacing or font-weight scale (1.75rem block margin x9, ~41 raw font weights). | deferred | |
| L8 | low | src/styles/_base.scss:16-17, src/styles/_nav.scss:188-190 | Hand-written font-smoothing and ellipsis; @unsass/utilities has mixins but is not a direct dependency. | deferred | |
