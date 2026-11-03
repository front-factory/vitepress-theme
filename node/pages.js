import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/**
 * Reads the few frontmatter keys the build helpers need. A full YAML parser would be a new
 * dependency for what is, here, scalars and flat lists: `key: value`, `key: [a, b]` and block
 * `- item` lists. Anything fancier (nested maps, multi-line strings) is left out on purpose.
 *
 * @param {string} source
 * @returns {{ data: Record<string, string | string[]>, body: string }}
 */
export function parseSource(source) {
    const match = FRONTMATTER.exec(source);
    const data = {};

    if (!match) {
        return {
            data,
            body: source.trim()
        };
    }

    const unquote = (value) => value.trim().replace(/^(['"])(.*)\1$/, '$2');
    let list = null;

    for (const line of match[1].split(/\r?\n/)) {
        const item = /^\s+-\s+(.*)$/.exec(line);

        if (item && list) {
            list.push(unquote(item[1]));
            continue;
        }

        const pair = /^([\w-]+):\s*(.*)$/.exec(line);

        list = null;

        if (!pair) {
            continue;
        }

        const [
            , key,
            value
        ] = pair;

        if (value.startsWith('[') && value.endsWith(']')) {
            data[key] = value.slice(1, -1).split(',').map(unquote).filter(Boolean);
        } else if (value === '') {
            list = data[key] = [];
        } else {
            data[key] = unquote(value);
        }
    }

    return {
        data,
        body: source.slice(match[0].length).trim()
    };
}

/**
 * Public URL path of a page: honours `rewrites`, `cleanUrls` and `base`.
 *
 * @param {import('vitepress').SiteConfig} siteConfig
 * @param {string} page Path relative to `srcDir`.
 */
export function pageUrl(siteConfig, page) {
    const rewritten = siteConfig.rewrites?.map?.[page] ?? page;
    let url = rewritten.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1');

    if (url && !url.endsWith('/') && !siteConfig.cleanUrls) {
        url += '.html';
    }

    return `${siteConfig.site.base}${url}`;
}

/** Site hostname without a trailing slash, from an explicit value or the sitemap option. */
export function hostnameOf(siteConfig, explicit) {
    const hostname = explicit ?? siteConfig.userConfig?.sitemap?.hostname;

    return hostname?.replace(/\/+$/, '');
}

/**
 * Every Markdown page of the site, source read and frontmatter parsed. `404.md` is left out.
 *
 * @param {import('vitepress').SiteConfig} siteConfig
 */
export async function readPages(siteConfig) {
    const pages = [];

    for (const page of siteConfig.pages) {
        if (page === '404.md') {
            continue;
        }

        let source;

        try {
            source = await readFile(join(siteConfig.srcDir, page), 'utf8');
        } catch {
            // Dynamic route or generated page: no source to read.
            continue;
        }

        const { data, body } = parseSource(source);
        const heading = /^#\s+(.+)$/m.exec(body)?.[1].trim();

        pages.push({
            page,
            data,
            body,
            url: pageUrl(siteConfig, page),
            title: data.title || heading || (page === 'index.md'
                ? siteConfig.site.title
                : page.replace(/\.md$/, '').split('/').pop()),
            description: data.description || ''
        });
    }

    return pages;
}

/** Filename (without extension) of a page's generated image: its source path, flattened. */
export function ogSlug(page) {
    return page.replace(/\.md$/, '').replace(/\//g, '-');
}

/**
 * Settings of `ff.og`, validated. `satori` cannot draw without a font, and the image URL must be
 * absolute for crawlers, so both are required: fail with a message that says what to add.
 */
export function ogOptions(siteConfig) {
    const og = siteConfig.site.themeConfig?.ff?.og;
    const hostname = hostnameOf(siteConfig, typeof og === 'object' ? og.hostname : undefined);
    const fonts = typeof og === 'object' ? og.fonts ?? [] : [];

    if (!fonts.length) {
        throw new Error('[vitepress-theme] `ff.og` needs at least one font: set `ff.og.fonts` (TTF, OTF or WOFF files).');
    }

    if (!hostname) {
        throw new Error('[vitepress-theme] `ff.og` needs an absolute address: set `ff.og.hostname` or `sitemap.hostname`.');
    }

    return {
        fonts,
        hostname
    };
}
