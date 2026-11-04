import { createContentLoader, type LoaderModule } from 'vitepress';
import type { ThemeConfig } from '../types.ts';

export interface Post {
    url: string
    title: string
    /** ISO date, as written in the frontmatter. */
    date: string
    author?: string
    tags: string[]
    excerpt?: string
}

declare const data: Post[];

export { data };

// A data loader runs in Node, outside any component, so it cannot call `useData()`. VitePress puts
// the resolved config on `globalThis` before it evaluates a loader file (`createContentLoader`
// reads it the same way), which is where the blog directory is read from.
const { site } = (globalThis as unknown as { VITEPRESS_CONFIG: { site: { themeConfig?: ThemeConfig } } })
    .VITEPRESS_CONFIG;
const dir = (site.themeConfig?.ff?.blog?.dir ?? 'blog').replace(/^\/+|\/+$/g, '');

// Annotated so the emitted declaration doesn't reference VitePress's private `GlobOptions` (TS4082).
const loader: LoaderModule<Post[]> = createContentLoader([
    `${dir}/**/*.md`,
    `!${dir}/index.md`
], {
    includeSrc: true,
    transform(raw) {
        return raw
            .filter(({ frontmatter }) => frontmatter.date)
            .map(({ url, src, frontmatter }): Post => ({
                url,
                title: frontmatter.title || /^#\s+(.+)$/m.exec(src ?? '')?.[1].trim() || url,
                date: new Date(frontmatter.date).toISOString(),
                author: frontmatter.author,
                tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
                excerpt: frontmatter.excerpt
            }))
            .sort((a, b) => b.date.localeCompare(a.date));
    }
});

export default loader;
