import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { hostnameOf, readPages } from './pages.js';

/**
 * Writes `llms.txt` (an index of the pages) and `llms-full.txt` (their Markdown, concatenated) to
 * the output directory, following https://llmstxt.org. A page opts out with `llms: false`.
 *
 * @param {import('vitepress').SiteConfig} siteConfig
 */
export async function generateLlms(siteConfig) {
    const { title, description } = siteConfig.site;
    const hostname = hostnameOf(siteConfig) ?? '';
    const pages = (await readPages(siteConfig)).filter(({ data }) => data.llms !== 'false');

    const index = pages.map(({ url, title: name, description: summary }) =>
        `- [${name}](${hostname}${url})${summary ? `: ${summary}` : ''}`);
    const full = pages.map(({ url, title: name, body }) =>
        `${/^#\s/.test(body) ? '' : `# ${name}\n\n`}Source: ${hostname}${url}\n\n${body}`);

    await mkdir(siteConfig.outDir, {
        recursive: true
    });

    await writeFile(
        join(siteConfig.outDir, 'llms.txt'),
        `# ${title}\n\n> ${description}\n\n## Pages\n\n${index.join('\n')}\n`
    );

    await writeFile(join(siteConfig.outDir, 'llms-full.txt'), `${full.join('\n\n---\n\n')}\n`);
}
