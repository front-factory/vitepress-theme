import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { searchForWorkspaceRoot } from 'vite';
import { generateLlms } from './node/llms.js';

const dir = import.meta.dirname;
const pkg = '@frontfactory/vitepress-theme';

/**
 * Default theme components this theme replaces wholesale. VitePress resolves them by path, so the
 * swap happens through a Vite alias.
 */
const overrides = {
    VPHero: 'src/components/FfHero.vue',
    VPFeature: 'src/components/FfFeature.vue',
    VPFooter: 'src/components/FfFooter.vue',
    VPHomeSponsors: 'src/components/FfHomeSponsors.vue',
    VPNavBarTitle: 'src/components/FfNavBarTitle.vue'
};

const alias = Object.entries(overrides).map(([
    name,
    file
]) => ({
    find: new RegExp(`^.*\\/${name}\\.vue$`),
    replacement: resolve(dir, file)
}));

/**
 * Stores the page's Markdown source, frontmatter stripped, on `pageData.ffMarkdown` for the "copy as
 * Markdown" button. Does nothing unless `themeConfig.ff.copyMarkdown` is on, so a site that does not
 * use it ships no source text.
 *
 * A hook declared by the host replaces the one in this config instead of adding to it. A site that
 * defines its own `transformPageData` calls this from it and returns the result:
 * `transformPageData: (pageData, ctx) => ffTransformPageData(pageData, ctx)`.
 *
 * @param {import('vitepress').PageData} pageData
 * @param {import('vitepress').TransformPageContext} ctx
 */
export async function ffTransformPageData(pageData, { siteConfig }) {
    if (!siteConfig.site.themeConfig?.ff?.copyMarkdown || !pageData.filePath) {
        return;
    }

    try {
        const source = await readFile(join(siteConfig.srcDir, pageData.filePath), 'utf8');

        return {
            ffMarkdown: source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim()
        };
    } catch {
        // Virtual or generated page: there is no source file to copy.
    }
}

/**
 * Writes the files generated at the end of the build: `llms.txt` and `llms-full.txt`, each only
 * when its `themeConfig.ff` option is on.
 *
 * Like every hook, a `buildEnd` declared by the host replaces ours: call this from it.
 *
 * @param {import('vitepress').SiteConfig} siteConfig
 */
export async function ffBuildEnd(siteConfig) {
    const ff = siteConfig.site.themeConfig?.ff;

    if (ff?.llms) {
        await generateLlms(siteConfig);
    }
}

/**
 * Head entries this theme adds: the accent preset and the banner scripts, which have to run before
 * the first paint. A host declaring its own `transformHead` calls this from it and merges the
 * result into its own entries.
 *
 * @param {import('vitepress').TransformContext} ctx
 * @returns {import('vitepress').HeadConfig[]}
 */
export function ffTransformHead({ siteData }) {
    const ff = siteData.themeConfig?.ff;
    const head = [];

    if (ff?.preset) {
        head.push([
            'script',
            {},
            `document.documentElement.dataset.ffPreset=${JSON.stringify(ff.preset)}`
        ]);
    }

    if (ff?.banner?.id) {
        const key = JSON.stringify(`ff-banner-${ff.banner.id}`);

        head.push([
            'script',
            {},
            `try{if(localStorage.getItem(${key}))` +
                'document.documentElement.classList.add(\'ff-banner-dismissed\')}catch(e){}'
        ]);
    }

    return head;
}

/**
 * Base config for `extends`, per
 * https://vitepress.dev/guide/custom-theme#distributing-a-custom-theme.
 *
 * Swaps the components the theme replaces, keeps the package out of dependency pre-bundling and
 * SSR externalisation, and lets Vite serve a locally linked checkout. The `fs.allow` entry adds to
 * Vite's default allow list rather than replacing it — `dir` is only needed on top of it, for the
 * case where the theme is npm-linked from outside the host project's own root (this repo's
 * playground, `npm link`). Replacing the list instead of extending it used to lock the dev server
 * out of the host project's own files whenever the theme was installed as a normal dependency
 * (e.g. on StackBlitz), because `dir` then points inside `node_modules`. `transformHead` injects
 * the inline script that keeps a dismissed banner from painting — it needs the banner id from the
 * host's own themeConfig, which is only known once VitePress has resolved the merged config, so it
 * cannot be a static head entry here. The accent preset goes the same way, so it is on <html> before
 * the first paint. `transformPageData` feeds the copy-as-Markdown button; see `ffTransformPageData`. `buildEnd` writes the generated files; see
 * `ffBuildEnd`.
 */
const config = {
    vite: {
        resolve: {
            alias 
        },
        optimizeDeps: {
            exclude: [
                pkg
            ] 
        },
        ssr: {
            noExternal: [
                pkg
            ] 
        },
        server: {
            fs: {
                allow: [
                    dir,
                    searchForWorkspaceRoot(process.cwd())
                ] 
            } 
        }
    },
    transformPageData: ffTransformPageData,
    transformHead: ffTransformHead,
    buildEnd: ffBuildEnd
};

export default config;
