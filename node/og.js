import {
    mkdir, readFile, writeFile 
} from 'node:fs/promises';
import { join, resolve } from 'node:path';
import {
    ogOptions, ogSlug, readPages 
} from './pages.js';

const WIDTH = 1200;
const HEIGHT = 630;

// The default theme's light palette, so a card looks like the site it advertises.
const paper = '#fbfaf8';
const ink = '#17171c';
const muted = '#5c5c66';
const rule = '#d6d3cd';
const accent = '#2745cf';

/** Satori element, as a plain object: no JSX, no build step. */
const el = (type, style, children) => ({
    type,
    props: {
        style,
        children
    }
});

function card({ siteTitle, title, description, family }) {
    const mono = {
        fontFamily: family,
        textTransform: 'uppercase',
        letterSpacing: 4,
        fontSize: 24,
        color: muted
    };

    return el('div', {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: WIDTH,
        height: HEIGHT,
        boxSizing: 'border-box',
        padding: 72,
        background: paper,
        fontFamily: family
    }, [
        el('div', {
            display: 'flex',
            alignItems: 'center',
            gap: 16
        }, [
            el('div', {
                width: 18,
                height: 18,
                background: accent
            }),
            el('div', mono, siteTitle)
        ]),
        el('div', {
            display: 'flex',
            flexDirection: 'column',
            gap: 28
        }, [
            el('div', {
                fontSize: title.length > 48 ? 60 : 76,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: -2,
                color: ink
            }, title),
            ...description ? [
                el('div', {
                    fontSize: 32,
                    lineHeight: 1.4,
                    color: muted
                }, description.length > 140 ? `${description.slice(0, 137)}...` : description)
            ] : []
        ]),
        el('div', {
            display: 'flex',
            width: '100%',
            height: 3,
            flexShrink: 0
        }, [
            el('div', {
                width: 160,
                height: 3,
                flexShrink: 0,
                backgroundColor: accent
            }),
            el('div', {
                flexGrow: 1,
                height: 3,
                backgroundColor: rule
            })
        ])
    ]);
}

/**
 * Renders one PNG per page into `outDir/og/`. `satori` and `@resvg/resvg-js` are optional peer
 * dependencies, loaded only here. Pages are drawn one after the other: each render is CPU-bound,
 * so parallelism would only add memory.
 *
 * @param {import('vitepress').SiteConfig} siteConfig
 */
export async function generateOg(siteConfig) {
    const { fonts } = ogOptions(siteConfig);
    let satori;
    let Resvg;

    try {
        [
            { default: satori },
            { Resvg }
        ] = await Promise.all([
            import('satori'),
            import('@resvg/resvg-js')
        ]);
    } catch {
        throw new Error('[vitepress-theme] `ff.og` needs `satori` and `@resvg/resvg-js`: run `npm install satori @resvg/resvg-js`.');
    }

    const loaded = await Promise.all(fonts.map(async ({ name, path, weight, style }) => ({
        name,
        data: await readFile(resolve(siteConfig.root ?? process.cwd(), path)),
        weight,
        style
    })));
    const { site } = siteConfig;
    const dir = join(siteConfig.outDir, 'og');

    await mkdir(dir, {
        recursive: true
    });

    for (const { page, data, title, description } of await readPages(siteConfig)) {
        if (data.og === 'false') {
            continue;
        }

        const svg = await satori(card({
            siteTitle: site.title,
            title,
            description: description || site.description,
            family: loaded[0].name
        }), {
            width: WIDTH,
            height: HEIGHT,
            fonts: loaded
        });

        await writeFile(
            join(dir, `${ogSlug(page)}.png`),
            new Resvg(svg).render().asPng()
        );
    }
}
