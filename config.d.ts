import type {
    HeadConfig, PageData, SiteConfig, TransformContext, TransformPageContext, UserConfig
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

/**
 * Writes the files generated at the end of the build (`llms.txt`, and the blog feed and Open Graph
 * images once enabled). Call it from your own `buildEnd`: a hook declared by the host replaces the
 * one in this config.
 */
export declare function ffBuildEnd(siteConfig: SiteConfig<ThemeConfig>): Promise<void>;

/**
 * Head entries added by the theme: the accent preset and banner scripts, the link to the blog's RSS
 * feed, and the Open Graph and Twitter tags (`og:*`, `twitter:card`). Call it from your own
 * `transformHead` and merge the result with your entries.
 */
export declare function ffTransformHead(ctx: TransformContext<ThemeConfig>): HeadConfig[];

export default config;
