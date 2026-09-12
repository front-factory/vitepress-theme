import { h } from 'vue';
import { VPDocAsideSponsors } from 'vitepress/theme';
import Theme from '../../../src';

// Same extension pattern the theme itself documents for a consuming site (see
// guide/getting-started.md): spread the theme, then wrap its own Layout. VPDocAsideSponsors sits
// in the doc aside rather than the home page — the default theme wires it into no slot on its own,
// a site has to add it, here demonstrated on every doc page.

const sponsors = [
    {
        tier: 'Sponsors',
        // VPSponsors reads `size` off each tier object once the data already has a tier/items
        // shape — a size prop on the component itself only applies to a flat, tier-less list.
        size: 'mini' as const,
        items: [
            {
                name: 'Acme Corp',
                img: '/sponsor-acme.png',
                url: 'https://example.com'
            },
            {
                name: 'Globex',
                img: '/sponsor-globex.png',
                url: 'https://example.com'
            }
        ]
    }
];

export default {
    ...Theme,
    Layout: () =>
        h(Theme.Layout!, null, {
            'aside-ads-before': () => h(VPDocAsideSponsors, {
                data: sponsors
            })
        })
};
