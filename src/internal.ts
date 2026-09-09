// Pieces borrowed from the VitePress default theme.
//
// They are imported from their own files rather than from `vitepress/theme`: components that this
// theme swaps in through a Vite alias would otherwise import the theme index that imports them
// back.

export { default as VPImage } from 'vitepress/dist/client/theme-default/components/VPImage.vue'
export { default as VPLink } from 'vitepress/dist/client/theme-default/components/VPLink.vue'
export {
    layoutInfoInjectionKey,
    useLayout
} from 'vitepress/dist/client/theme-default/composables/layout.js'
