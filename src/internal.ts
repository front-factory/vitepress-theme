// Pieces borrowed from the VitePress default theme.
//
// `VPImage`, `VPLink` and `useLayout` are part of its public surface (`vitepress/theme`), but they
// are imported from their own files instead: components that this theme swaps in through a Vite
// alias would otherwise import the theme index that imports them back. Nothing here reaches for an
// API the default theme does not export.

export { default as VPIcon } from 'vitepress/dist/client/theme-default/components/VPIcon.vue'
export { default as VPImage } from 'vitepress/dist/client/theme-default/components/VPImage.vue'
export { default as VPLink } from 'vitepress/dist/client/theme-default/components/VPLink.vue'
export { useLayout } from 'vitepress/dist/client/theme-default/composables/layout.js'
