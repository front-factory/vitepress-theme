/**
 * Reads an option written as `boolean | object`: `true` gives the empty object (every default), an
 * object is kept as is, and `false`, a missing value or an opt-out gives `null`. Shared by the
 * client and the build, so it stays free of Node imports.
 *
 * @template T
 * @param {boolean | T | undefined} value The option as written in `themeConfig.ff`.
 * @param {boolean} [optOut] A per-page opt-out, such as `feedback: false` in the frontmatter.
 * @returns {T | null}
 */
export function resolveOption(value, optOut = false) {
    if (!value || optOut) {
        return null;
    }

    return value === true ? /** @type {T} */ ({}) : /** @type {T} */ (value);
}
