/**
 * Blog directory, without a slash at either end. Shared by the client, the content loader and the
 * RSS feed, so it stays free of Node imports.
 *
 * @param {{ blog?: { dir?: string } }} [ff] The `themeConfig.ff` options.
 */
export function blogDir(ff) {
    return (ff?.blog?.dir ?? 'blog').replace(/^\/+|\/+$/g, '');
}
