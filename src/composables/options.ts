import { computed } from 'vue';
import { useData } from 'vitepress';
import type { ThemeLabels, ThemeOptions } from '../types';

/**
 * Theme options declared under `themeConfig.ff`, with an empty object as a fallback so callers
 * never have to guard.
 */
export function useThemeOptions() {
    const { theme } = useData();

    return computed<ThemeOptions>(() => theme.value.ff ?? {});
}

/** English fallbacks for every string this theme adds. */
export const defaultLabels: Required<ThemeLabels> = {
    bannerDismiss: 'Dismiss announcement',
    readingTime: '{0} min read',
    lastUpdated: 'Updated {0}',
    heroInstall: 'Install',
    heroCopied: 'Copied',
    heroCopyLabel: 'Copy {0}',
    backToTop: 'Top',
    footerSocial: 'Follow',
    newTab: 'opens in a new tab',
    sponsors: 'Sponsors',
    sponsorsAction: 'Become a sponsor'
};

/**
 * Labels for the current locale. VitePress merges `themeConfig` per locale before it reaches the
 * client, so a site translates the theme by declaring `ff.labels` under each locale.
 */
export function useLabels() {
    const options = useThemeOptions();

    return computed<Required<ThemeLabels>>(() => {
        const overrides = options.value.labels ?? {};
        const labels = {
            ...defaultLabels
        };

        for (const key of Object.keys(defaultLabels) as (keyof ThemeLabels)[]) {
            labels[key] = overrides[key] || labels[key];
        }

        return labels;
    });
}

/** Fills the `{0}` placeholder of a label. */
export function format(label: string, value: string | number) {
    return label.replace('{0}', String(value));
}
