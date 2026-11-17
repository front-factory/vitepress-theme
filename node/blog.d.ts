export function blogDir(ff?: { blog?: { dir?: string } }): string;

export function hasValidDate(value: unknown): boolean;

export function isPostPath(dir: string, path: string, date: unknown): boolean;

export function resolveAuthor<T extends { name?: string }>(authors: Record<string, T>, value?: string): T | null;

export function firstHeading(body: string): string | undefined;

export function toTags(value: unknown): unknown[];
