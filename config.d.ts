import type {
    PageData, TransformPageContext, UserConfig 
} from 'vitepress';
import type { ThemeConfig } from './src/types';

declare const config: UserConfig<ThemeConfig>;

/**
 * Stores the page's Markdown source on `pageData.ffMarkdown` when `themeConfig.ff.copyMarkdown` is on.
 * Call it from your own `transformPageData` and return the result: a hook declared by the host
 * replaces the one in this config.
 */
export declare function ffTransformPageData(
    pageData: PageData,
    ctx: TransformPageContext<ThemeConfig>
): Promise<{ ffMarkdown: string } | undefined>;

export default config;
