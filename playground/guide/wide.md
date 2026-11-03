---
wide: true
---

# Wide layout

`wide: true` in the frontmatter widens the text column to the full band and hides the outline, for tables and API listings that need the room.

## Comparison

| Token | Light | Dark | Used by | Notes |
| --- | --- | --- | --- | --- |
| `--ff-color-accent` | `#2745cf` | `#94a8ff` | Links, markers, focus rings | Swapped as a whole by `ff.preset`. |
| `--ff-color-rule` | hairline grey | hairline grey | Section rules, tables, footer | Fades out to the right under each `h2`. |
| `--ff-motion-duration` | `0.2s` | `0.2s` | Hover transitions | Reduced to zero under `prefers-reduced-motion`. |
| `--ff-layout-wide` | `76rem` | `76rem` | Home, navigation, wide pages | Also sets the outer band of every page. |
