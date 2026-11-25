# Audit: Native coverage

Date: 2026-11-25
Baseline commit: adef74d
Scope: Default-theme UI parts not restyled by src/styles
Status: open

## Findings

| ID | Severity | File | Problem | Status | Notes (commit / reason) |
|----|----------|------|---------|--------|-------------------------|
| S1 | medium | src/styles | `.VPSkipLink` (keyboard "Skip to content" pill) keeps stock styling. | fixed | |
| S2 | medium | src/styles/_nav.scss | Mobile nav screen: `.VPNavScreenTranslations`, `.VPNavScreenAppearance`, `.VPNavScreenSocialLinks` not styled (only `.VPNavScreen`, menu links are). | fixed | |
| S3 | low | src/styles/_nav.scss | Desktop navbar extras `.VPNavBarTranslations`, `.VPNavBarSocialLinks`, `.VPNavBarAppearance`, `.VPNavBarExtra` only spaced via wrappers; check and complete. | fixed | Language flyout title and "..." menu appearance label now use the menu label style. | |
| S4 | low | src/styles/_code.scss | Focused code lines (`.has-focused-lines`, `.line.has-focus`, `// [!code focus]`) keep stock blur/dim. | open | |
| S5 | low | src/styles/_content.scss | `.vp-external-link-icon` keeps stock colour/spacing. | open | |
| S6 | low | src/styles/_content.scss | `[[toc]]` list `.table-of-contents` has no treatment. | open | |
| S7 | low | src/styles/_team.scss | Large team card size. | wontfix | VPTeamMembers only supports small and medium (default medium); both styled. |
| S8 | low | src/styles | Math (`.katex`, `mjx-container`) and emoji not styled; only matters with markdown.math. | open | |
| S9 | low | src/styles | Stock `.VPHomeHero`/`.VPHomeFeatures`. | wontfix | VPHero and VPFeature are replaced by alias (config.js overrides). |
