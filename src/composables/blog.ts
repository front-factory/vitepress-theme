import { computed } from 'vue';
import { useData } from 'vitepress';
import { useThemeOptions } from './options';
import {
    blogDir, isPostPath, resolveAuthor 
} from '../../node/blog.js';

export { resolveAuthor };

/** Blog options, with the directory normalised (no slash at either end). */
export function useBlog() {
    const options = useThemeOptions();
    const { page, frontmatter } = useData();

    const dir = computed(() => blogDir(options.value));

    // A post is a dated page under the blog directory, the index excluded.
    const isPost = computed(() =>
        isPostPath(dir.value, page.value.relativePath, frontmatter.value.date)
    );

    return {
        dir,
        isPost,
        authors: computed(() => options.value.blog?.authors ?? {})
    };
}

// UTC, so the server and the browser print the same day whatever their time zone.
export function formatDate(date: string, lang: string) {
    return new Intl.DateTimeFormat(lang, {
        dateStyle: 'long',
        timeZone: 'UTC'
    }).format(new Date(date));
}
