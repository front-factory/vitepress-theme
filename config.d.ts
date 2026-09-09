import type { UserConfig } from 'vitepress'
import type { ThemeConfig } from './src/types'

export declare function extendConfig<T extends UserConfig<ThemeConfig>>(config: T): T
