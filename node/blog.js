/**
 * Blog directory, without a slash at either end. Shared by the client, the content loader and the
 * RSS feed, so it stays free of Node imports.
 *
 * @param {{ blog?: { dir?: string } }} [ff] The `themeConfig.ff` options.
 */
export function blogDir(ff) {
    return (ff?.blog?.dir ?? 'blog').replace(/^\/+|\/+$/g, '');
}

/**
 * Whether a frontmatter `date` is present and parsable: a page without one is not a post, and an
 * unparsable one must not crash `toISOString()`.
 *
 * @param {unknown} value
 */
export function hasValidDate(value) {
    return !!value && !Number.isNaN(new Date(/** @type {string} */ (value)).getTime());
}

/**
 * Whether a page is a post: a dated page under the blog directory, the index excluded.
 *
 * @param {string} dir The blog directory, as returned by `blogDir`.
 * @param {string} path The page path relative to the source directory.
 * @param {unknown} date The frontmatter `date`.
 */
export function isPostPath(dir, path, date) {
    return path.startsWith(`${dir}/`) && path !== `${dir}/index.md` && hasValidDate(date);
}

/**
 * `author` is a key of `ff.blog.authors`, or a plain name used as is.
 *
 * @template {{ name?: string }} T
 * @param {Record<string, T>} authors
 * @param {string} [value]
 * @returns {T | null}
 */
export function resolveAuthor(authors, value) {
    return value ? authors[value] ?? {
        name: value
    } : null;
}

/**
 * Text of the first `# heading` line of a Markdown body, if any.
 *
 * @param {string} body
 */
export function firstHeading(body) {
    return /^#\s+(.+)$/m.exec(body)?.[1].trim();
}

/**
 * The frontmatter `tags` when it is a list, else an empty list.
 *
 * @param {unknown} value
 * @returns {unknown[]}
 */
export function toTags(value) {
    return Array.isArray(value) ? [
        ...new Set(value)
    ] : [];
}
