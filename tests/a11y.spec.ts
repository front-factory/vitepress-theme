import AxeBuilder from '@axe-core/playwright';
import {
    expect, test, type Page 
} from '@playwright/test';

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

async function violations(page: Page, include?: string, disabledRules: string[] = []) {
    const builder = new AxeBuilder({
        page
    }).withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa'
    ]).disableRules(disabledRules);

    if (include) {
        builder.include(include);
    }

    return (await builder.analyze()).violations;
}

async function open(page: Page, path: string) {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
}

for (const path of pages) {
    test(`no WCAG A/AA violation on ${path}`, async ({ page }) => {
        await open(page, path);

        expect(await violations(page)).toEqual([]);
    });
}

// Overlays and hidden panels are not in the initial render, so axe never sees them above.
test.describe('open states', () => {
    test('search modal with results', async ({ page }) => {
        await open(page, '/');
        await page.locator('.VPNavBarSearch button').first().click();
        await page.locator('.VPLocalSearchBox input').fill('tabs');
        await expect(page.locator('.VPLocalSearchBox .result').first()).toBeVisible();

        // Both come from VitePress' own VPLocalSearchBox markup, which the theme only styles:
        // each result is a role="option" <li> wrapping a focusable <a> (nested-interactive),
        // and that link's aria-label differs from its visible text (label-content-name-mismatch).
        expect(await violations(page, '.VPLocalSearchBox', [
            'nested-interactive',
            'label-content-name-mismatch'
        ])).toEqual([]);
    });

    test('version switcher menu', async ({ page, isMobile }) => {
        test.skip(isMobile, 'The switcher lives in the desktop nav bar.');

        await open(page, '/');
        await page.locator('.ff-version-switcher > button').click();
        await expect(page.locator('.ff-version-switcher .menu')).toBeVisible();

        expect(await violations(page, '.ff-version-switcher')).toEqual([]);
    });

    test('mobile nav screen', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'The hamburger only exists on small viewports.');

        await open(page, '/');
        await page.locator('.VPNavBarHamburger').click();
        await expect(page.locator('.VPNavScreen')).toBeVisible();

        expect(await violations(page, '.VPNavScreen')).toEqual([]);
    });

    test('inactive tab panel', async ({ page }) => {
        await open(page, '/guide/components');
        await page.locator('.ff-tabs [role="tab"]').nth(1).click();
        await expect(page.locator('.ff-tabs [role="tabpanel"]').nth(1)).toBeVisible();

        expect(await violations(page, '.ff-tabs')).toEqual([]);
    });
});
