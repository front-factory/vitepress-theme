import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { blogDir, hasValidDate } from './blog.js';
import { resolveOption } from './options.js';
import { hostnameOf } from './pages.js';

/**
 * Writes `feed.xml`, an RSS 2.0 feed of the blog posts (dated pages under the blog directory,
 * newest first). `feed` is an optional peer dependency, so it is only loaded here, when the feed is
 * actually requested.
 *
 * @param {import('vitepress').SiteConfig} siteConfig
 * @param {Awaited<ReturnType<typeof import('./pages.js').readPages>>} allPages Pages read once by the caller.
 */
export async function generateRss(siteConfig, allPages) {
    const ff = siteConfig.site.themeConfig.ff;
    const rss = resolveOption(ff.blog.rss) ?? {};
    const hostname = hostnameOf(siteConfig, rss.hostname);

    if (!hostname) {
        throw new Error(
            '[vitepress-theme] `ff.blog.rss` needs an absolute address: set `ff.blog.rss.hostname` or `sitemap.hostname`.'
        );
    }

    let Feed;

    try {
        ({ Feed } = await import('feed'));
    } catch {
        throw new Error('[vitepress-theme] `ff.blog.rss` needs the `feed` package: run `npm install feed`.');
    }

    const { title, description, lang, base } = siteConfig.site;
    const authors = ff.blog.authors ?? {};
    const dir = blogDir(ff);
    const site = `${hostname}${base}`;
    const feed = new Feed({
        title,
        description,
        id: site,
        link: site,
        language: lang,
        copyright: rss.copyright ?? '',
        feedLinks: {
            rss: `${site}feed.xml`
        }
    });

    const posts = allPages
        .filter(({ page, data }) => page.startsWith(`${dir}/`) && page !== `${dir}/index.md` && hasValidDate(data.date))
        .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

    for (const { url, title: name, data } of posts) {
        const author = authors[data.author] ?? (data.author ? {
            name: data.author
        } : null);

        feed.addItem({
            title: name,
            id: `${hostname}${url}`,
            link: `${hostname}${url}`,
            description: data.excerpt,
            date: new Date(data.date),
            author: author ? [
                author
            ] : undefined,
            category: (Array.isArray(data.tags) ? data.tags : []).map((tag) => ({
                name: tag
            }))
        });
    }

    await mkdir(siteConfig.outDir, {
        recursive: true
    });

    await writeFile(join(siteConfig.outDir, 'feed.xml'), feed.rss2());
}
