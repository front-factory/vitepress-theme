import { defineConfig } from 'vitepress'
import baseConfig from '../../config.js'
import type { ThemeConfig } from '../../src/types.ts'
import pkg from '../../package.json' with { type: 'json' }

export default defineConfig<ThemeConfig>({
    extends: baseConfig,
    title: 'Front Factory',
    description: 'Editorial VitePress theme.',
    srcDir: '.',
    lastUpdated: true,
    cleanUrls: true,
    transformPageData(pageData) {
        if (pageData.frontmatter.layout === 'home') {
            const versionRow = pageData.frontmatter.hero?.meta?.find(
                (row: { label: string }) => row.label === 'Version'
            )
            if (versionRow) versionRow.value = pkg.version
        }
    },
    themeConfig: {
        search: { provider: 'local' },
        editLink: {
            pattern: 'https://example.com/edit/:path',
            text: 'Edit this page'
        },
        nav: [
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'Components', link: '/guide/components' },
            {
                text: pkg.version,
                items: [{ text: 'Changelog', link: 'https://example.com' }]
            }
        ],
        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'Getting started', link: '/guide/getting-started' },
                    { text: 'Configuration', link: '/guide/configuration' }
                ]
            },
            {
                text: 'Writing',
                items: [
                    { text: 'Components', link: '/guide/components' },
                    { text: 'Markdown', link: '/guide/markdown' }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com' },
            { icon: 'bluesky', link: 'https://bsky.app' },
            { icon: 'x', link: 'https://x.com' }
        ],
        footer: {
            message: 'Developed with love.',
            copyright: 'Copyright © 2026 Front Factory'
        },
        ff: {
            navOrder: 'menu-first',
            banner: {
                id: `v${pkg.version}`,
                text: `<strong>${pkg.version}</strong> — the banner now ships in colour. This is it.`,
                link: '/guide/configuration',
                linkText: 'Configure it',
                variant: 'rainbow',
                icon: '🌈'
            },
            footerColumns: [
                {
                    title: 'Docs',
                    items: [
                        { text: 'Getting started', link: '/guide/getting-started' },
                        { text: 'Configuration', link: '/guide/configuration' }
                    ]
                },
                {
                    title: 'Project',
                    items: [
                        { text: 'GitHub', link: 'https://github.com' },
                        { text: 'Changelog', link: 'https://github.com' }
                    ]
                }
            ]
        }
    }
})
