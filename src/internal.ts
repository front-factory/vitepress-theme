// Pieces borrowed from the VitePress default theme.
//
// `VPImage`, `VPLink` and `useLayout` are part of its public surface (`vitepress/theme`), but they
// are imported from their own files instead: components that this theme swaps in through a Vite
// alias would otherwise import the theme index that imports them back. `normalizeLink` is the one
// exception: it is not public, but it is what VPLink and VPButton run every href through (site
// `base`, `.html` suffix without `cleanUrls`), and the theme's own links need the same treatment.

export { default as VPBadge } from 'vitepress/dist/client/theme-default/components/VPBadge.vue';
export { default as VPFlyout } from 'vitepress/dist/client/theme-default/components/VPFlyout.vue';
export { default as VPIcon } from 'vitepress/dist/client/theme-default/components/VPIcon.vue';
export { default as VPImage } from 'vitepress/dist/client/theme-default/components/VPImage.vue';
export { default as VPLink } from 'vitepress/dist/client/theme-default/components/VPLink.vue';
export { default as VPSponsors } from 'vitepress/dist/client/theme-default/components/VPSponsors.vue';
export { useLangs } from 'vitepress/dist/client/theme-default/composables/langs.js';
export { useLayout } from 'vitepress/dist/client/theme-default/composables/layout.js';
export { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils.js';
