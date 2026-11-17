/**
 * Class put on `<html>` once a banner is dismissed. Shared by the client and the inline head
 * script, so this file stays free of Node imports.
 */
export const BANNER_DISMISSED_CLASS = 'ff-banner-dismissed';

/**
 * `localStorage` key that remembers the dismissal of the banner `id`.
 *
 * @param {string} id
 */
export function bannerKey(id) {
    return `ff-banner-${id}`;
}
