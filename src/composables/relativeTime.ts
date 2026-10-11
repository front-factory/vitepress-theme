const units: [Intl.RelativeTimeFormatUnit, number][] = [
    [
        'year',
        31536000000
    ],
    [
        'month',
        2592000000
    ],
    [
        'week',
        604800000
    ],
    [
        'day',
        86400000
    ],
    [
        'hour',
        3600000
    ],
    [
        'minute',
        60000
    ]
];

const formatters = new Map<string, Intl.RelativeTimeFormat>();

function formatter(lang: string) {
    let relative = formatters.get(lang);

    if (!relative) {
        relative = new Intl.RelativeTimeFormat(lang, {
            numeric: 'auto'
        });

        formatters.set(lang, relative);
    }

    return relative;
}

/** Formats a timestamp relative to now, in the largest unit it spans: "3 days ago". */
export function formatRelative(timestamp: number, lang: string) {
    const elapsed = timestamp - Date.now();
    const relative = formatter(lang);

    for (const [
        unit,
        ms
    ] of units) {
        if (Math.abs(elapsed) >= ms) {
            return relative.format(Math.round(elapsed / ms), unit);
        }
    }

    return relative.format(0, 'minute');
}
