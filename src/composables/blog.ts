import { computed } from 'vue';
import { useData } from 'vitepress';
import { useThemeOptions } from './options';
import type { BlogAuthor } from '../types';

/** Blog options, with the directory normalised (no slash at either end). */
export function useBlog() {
    const options = useThemeOptions();
    const { page, frontmatter } = useData();

    const dir = computed(() => (options.value.blog?.dir ?? 'blog').replace(/^\/+|\/+$/g, ''));

    // A post is a dated page under the blog directory, the index excluded.
    const isPost = computed(
        () => page.value.relativePath.startsWith(`${dir.value}/`) && !!frontmatter.value.date
    );

    return {
        dir,
        isPost,
        authors: computed(() => options.value.blog?.authors ?? {})
    };
}

/** `author` is a key of `ff.blog.authors`, or a plain name used as is. */
export function resolveAuthor(authors: Record<string, BlogAuthor>, value?: string): BlogAuthor | null {
    return value ? authors[value] ?? {
        name: value
    } : null;
}

// UTC, so the server and the browser print the same day whatever their time zone.
export function formatDate(date: string, lang: string) {
    return new Intl.DateTimeFormat(lang, {
        dateStyle: 'long',
        timeZone: 'UTC'
    }).format(new Date(date));
}
