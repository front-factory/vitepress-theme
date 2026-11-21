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

    test('404 page', async ({ page }) => {
        await open(page, '/does-not-exist');
        await expect(page.locator('.NotFound')).toBeVisible();

        // The link's aria-label ("go to home") comes from VitePress' own NotFound markup and differs
        // from its visible text (label-content-name-mismatch); the theme only styles it.
        expect(await violations(page, undefined, [
            'label-content-name-mismatch'
        ])).toEqual([]);
    });

    test('inactive tab panel', async ({ page }) => {
        await open(page, '/guide/components');
        await page.locator('.ff-tabs [role="tab"]').nth(1).click();
        await expect(page.locator('.ff-tabs [role="tabpanel"]').nth(1)).toBeVisible();

        expect(await violations(page, '.ff-tabs')).toEqual([]);
    });
});

// Behaviour of the card, page actions and tabs fixes, which axe alone does not assert.
test.describe('component semantics', () => {
    test('linked card: only the title is the link', async ({ page }) => {
        await open(page, '/guide/components');

        const link = page.locator('.ff-card-linked .ff-card-anchor').first();
        const title = await page.locator('.ff-card-linked .ff-card-title').first().innerText();

        await expect(link).toHaveAccessibleName(title.trim());
    });

    test('page actions menu: aria-controls and first item focused', async ({ page }) => {
        await open(page, '/guide/components');

        const toggle = page.locator('.ff-doc-meta-toggle');

        await toggle.click();

        const menu = page.locator('.ff-doc-meta-menu');

        await expect(menu).toBeVisible();

        const id = await menu.getAttribute('id');

        expect(id).toBeTruthy();
        await expect(toggle).toHaveAttribute('aria-controls', id!);
        await expect(menu.locator('[role="menuitem"]').first()).toBeFocused();
    });

    test('tabs: ariaLabel names the tablist', async ({ page }) => {
        await open(page, '/guide/components');

        await expect(page.locator('.ff-tabs [role="tablist"]').first()).toHaveAccessibleName(
            'Package manager'
        );
    });
});
