import { computed } from 'vue'
import { useData } from 'vitepress'
import type { ThemeConfig, ThemeOptions } from '../types'

/**
 * Theme options declared under `themeConfig.ff`, with an empty object as a fallback so callers
 * never have to guard.
 */
export function useThemeOptions() {
    const { theme } = useData()

    return computed<ThemeOptions>(() => (theme.value as ThemeConfig).ff ?? {})
}
