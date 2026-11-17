import type { ThemeOptions } from '../src/types';

export type Network = 'x' | 'linkedin' | 'bluesky' | 'mastodon';

export const NETWORKS: readonly Network[];

export function resolvePageActions(ff?: ThemeOptions): {
    markdown: boolean;
    link: boolean;
    share: Network[];
    instance: string;
};
