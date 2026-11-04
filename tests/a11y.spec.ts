import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = [
    '/',
    '/team',
    '/guide/getting-started',
    '/guide/configuration',
    '/guide/components',
    '/guide/markdown',
    '/guide/wide',
    '/blog/',
    '/blog/hello-editorial',
    '/fr/',
    '/fr/team',
    '/fr/guide/getting-started',
    '/fr/guide/components',
    '/fr/guide/wide'
];

for (const path of pages) {
    test(`no WCAG A/AA violation on ${path}`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({
            page 
        })
            .withTags([
                'wcag2a',
                'wcag2aa',
                'wcag21a',
                'wcag21aa'
            ])
            .analyze();

        expect(results.violations).toEqual([]);
    });
}
