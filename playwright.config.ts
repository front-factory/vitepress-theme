import { defineConfig, devices } from '@playwright/test';

// No @types/node in the project: declare the one global this file reads.
declare const process: { env: Record<string, string | undefined> };

export default defineConfig({
    testDir: 'tests',
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [
        [
            'list'
        ],
        [
            'html',
            {
                open: 'never' 
            }
        ]
    ] : 'list',
    use: {
        baseURL: 'http://localhost:4173',
        reducedMotion: 'reduce',
        colorScheme: 'light'
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'] 
            }
        }
    ],
    // The playground has to be built beforehand: `npm run build:playground`.
    webServer: {
        command: 'npx vitepress preview playground --port 4173',
        url: 'http://localhost:4173',
        reuseExistingServer: !process.env.CI
    }
});
