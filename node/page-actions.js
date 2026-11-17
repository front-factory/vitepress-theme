/**
 * Networks the page actions can share to, in menu order. Shared by the client and the build, so
 * this file stays free of Node imports.
 */
export const NETWORKS = /** @type {const} */ ([
    'x',
    'linkedin',
    'bluesky',
    'mastodon'
]);

/**
 * Reads the page actions intent from the `themeConfig.ff` options: `true` turns on everything, an
 * object turns on its explicit flags, `false` nothing, and left unset only "Copy link" is on. The
 * deprecated `copyMarkdown: true` still turns on the Markdown action. `markdown` is the config intent only: the client also needs
 * the page's `ffMarkdown`.
 *
 * @param {import('../src/types.js').ThemeOptions} [ff] The `themeConfig.ff` options.
 */
export function resolvePageActions(ff) {
    const all = ff?.pageActions === true;
    const config = typeof ff?.pageActions === 'object' ? ff.pageActions : {};

    return {
        markdown: all || !!config.copyMarkdown || ff?.copyMarkdown === true,
        link: all || ff?.pageActions === undefined || !!config.copyLink,
        share: all ? [
            ...NETWORKS
        ] : [
            ...(config.share ?? [])
        ],
        instance: config.mastodonInstance ?? 'mastodon.social'
    };
}
