import { resolve } from 'node:path'

const dir = import.meta.dirname
const pkg = '@frontfactory/vitepress-theme'

/**
 * Default theme components this theme replaces wholesale. VitePress resolves them by path, so the
 * swap happens through a Vite alias.
 */
const overrides = {
    VPHero: 'src/components/FfHero.vue',
    VPFeature: 'src/components/FfFeature.vue',
    VPFooter: 'src/components/FfFooter.vue'
}

const alias = Object.entries(overrides).map(([name, file]) => ({
    find: new RegExp(`^.*\\/${name}\\.vue$`),
    replacement: resolve(dir, file)
}))

/**
 * Base config for `extends`, per
 * https://vitepress.dev/guide/custom-theme#distributing-a-custom-theme.
 *
 * Swaps the components the theme replaces, keeps the package out of dependency pre-bundling and
 * SSR externalisation, and lets Vite serve a locally linked checkout. `transformHead` injects the
 * inline script that keeps a dismissed banner from painting — it needs the banner id from the
 * host's own themeConfig, which is only known once VitePress has resolved the merged config, so it
 * cannot be a static head entry here.
 */
const config = {
    vite: {
        resolve: { alias },
        optimizeDeps: { exclude: [pkg] },
        ssr: { noExternal: [pkg] },
        server: { fs: { allow: [dir] } }
    },
    transformHead({ siteData }) {
        const id = siteData.themeConfig?.ff?.banner?.id

        if (!id) return []

        return [
            [
                'script',
                {},
                `try{if(localStorage.getItem('ff-banner-${id}'))` +
                    `document.documentElement.classList.add('ff-banner-dismissed')}catch(e){}`
            ]
        ]
    }
}

export default config
