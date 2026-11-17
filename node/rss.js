import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
    blogDir, isPostPath, resolveAuthor, toTags
} from './blog.js';
import { resolveOption } from './options.js';
import { requireHostname } from './pages.js';

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
    const hostname = requireHostname(siteConfig, rss.hostname, 'ff.blog.rss');

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
        .filter(({ page, data }) => isPostPath(dir, page, data.date))
        .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

    for (const { url, title: name, data } of posts) {
        const author = resolveAuthor(authors, data.author);

        feed.addItem({
            title: name,
            id: `${hostname}${url}`,
            link: `${hostname}${url}`,
            description: data.excerpt,
            date: new Date(data.date),
            author: author ? [
                author
            ] : undefined,
            category: toTags(data.tags).map((tag) => ({
                name: tag
            }))
        });
    }

    await mkdir(siteConfig.outDir, {
        recursive: true
    });

    await writeFile(join(siteConfig.outDir, 'feed.xml'), feed.rss2());
}
