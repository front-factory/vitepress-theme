import { defineConfig } from 'vitepress'
import { extendConfig } from '../../config.js'
import type { ThemeConfig } from '../../src/types.ts'

export default extendConfig(
    defineConfig<ThemeConfig>({
        title: 'Front Factory',
        description: 'Editorial VitePress theme.',
        srcDir: '.',
        lastUpdated: true,
        cleanUrls: true,
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
                    text: '0.0.0',
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
            socialLinks: [{ icon: 'github', link: 'https://github.com' }],
            footer: {
                message: 'Released under the MIT License.',
                copyright: 'Copyright © 2026 Boris Damevin'
            },
            ff: {
                banner: {
                    id: 'v1',
                    text: 'Version 1.0 is out.',
                    link: '/guide/getting-started',
                    linkText: 'Read the notes'
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
)
