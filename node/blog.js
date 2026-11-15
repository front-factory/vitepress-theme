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
