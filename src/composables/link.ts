/**
 * `VPLink` wiring shared by every card-like block that is either a link or a plain container
 * (`FfFeature`, `Card`): the tag follows the link, and the icon VitePress would otherwise add next
 * to external links is always suppressed since these blocks draw their own.
 */
export function cardLinkProps(link?: string, rel?: string, target?: string) {
    return {
        href: link,
        rel,
        target,
        noIcon: true,
        tag: link ? 'a' : 'div'
    } as const;
}
