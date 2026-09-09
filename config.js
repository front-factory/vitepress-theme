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

function aliases() {
    return Object.entries(overrides).map(([name, file]) => ({
        find: new RegExp(`^.*\\/${name}\\.vue$`),
        replacement: resolve(dir, file)
    }))
}

function push(target, key, values) {
    const list = (target[key] ??= [])

    if (Array.isArray(list)) list.push(...values)
}

/**
 * Wraps a VitePress config with everything the theme needs on the Node side: component swaps,
 * dependency handling and the inline script that keeps a dismissed banner from painting.
 *
 * @param {object} config A config built with defineConfig().
 *
 * @returns {object} The same object, mutated.
 */
export function extendConfig(config) {
    const banner = config.themeConfig?.ff?.banner

    if (banner?.id) {
        config.head ??= []
        config.head.unshift([
            'script',
            {},
            `try{if(localStorage.getItem('ff-banner-${banner.id}'))` +
                `document.documentElement.classList.add('ff-banner-dismissed')}catch(e){}`
        ])
    }

    const vite = (config.vite ??= {})

    // Component swaps. Vite only understands regular expressions in the array form, so an existing
    // object is converted rather than merged into.

    vite.resolve ??= {}

    const alias = vite.resolve.alias

    if (Array.isArray(alias)) {
        alias.push(...aliases())
    } else {
        vite.resolve.alias = [
            ...Object.entries(alias ?? {}).map(([find, replacement]) => ({ find, replacement })),
            ...aliases()
        ]
    }

    // The theme is published as source: it must not be pre-bundled, and it must be compiled for
    // the SSR build. The allow entry is what makes a locally linked checkout work.

    vite.optimizeDeps ??= {}
    push(vite.optimizeDeps, 'exclude', [pkg])

    vite.ssr ??= {}

    if (vite.ssr.noExternal !== true) {
        if (!Array.isArray(vite.ssr.noExternal) && vite.ssr.noExternal) {
            vite.ssr.noExternal = [vite.ssr.noExternal]
        }

        push(vite.ssr, 'noExternal', [pkg])
    }

    vite.server ??= {}
    vite.server.fs ??= {}
    push(vite.server.fs, 'allow', [dir])

    return config
}
