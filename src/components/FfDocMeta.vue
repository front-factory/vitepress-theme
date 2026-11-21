<script setup lang="ts">
import {
    computed, h, nextTick, onMounted, onUnmounted, ref, useId, watch
} from 'vue';
import { useData } from 'vitepress';
import { useLayout } from '../internal';
import { useCopy } from '../composables/copy';
import { resolveOption } from '../../node/options.js';
import { resolvePageActions, type Network } from '../../node/page-actions.js';
import { formatRelative } from '../composables/relativeTime';
import {
    format, useLabels, useThemeOptions 
} from '../composables/options';
import type { DefaultTheme } from 'vitepress/theme';

const { page, frontmatter, lang } = useData();
const { sidebarGroups } = useLayout();
const options = useThemeOptions();
const labels = useLabels();

const meta = computed(() =>
    resolveOption(options.value.meta ?? true, frontmatter.value.docMeta === false)
);

// --------------------------------------------------------------------------------------------- //
// Section, read from the sidebar the site already declares
//
// The groups come from the default theme's own resolver, so multi-sidebar configs, per-group
// `base` prefixes and `sidebar: false` in the frontmatter are all already accounted for.
// --------------------------------------------------------------------------------------------- //

function normalize(path: string) {
    return path
        .replace(/^\//, '')
        .replace(/(index)?\.(md|html)$/, '')
        .replace(/\/$/, '');
}

function contains(items: DefaultTheme.SidebarItem[], path: string): boolean {
    return items.some(
        (item) =>
            (item.link && normalize(item.link) === path) || contains(item.items ?? [], path)
    );
}

const section = computed(() => {
    if (!meta.value || meta.value.section === false) {
        return null;
    }

    if (frontmatter.value.section) {
        return String(frontmatter.value.section);
    }

    const path = normalize(page.value.relativePath);

    return sidebarGroups.value.find((group) => contains(group.items ?? [], path))?.text ?? null;
});

// --------------------------------------------------------------------------------------------- //
// Reading time, measured on the rendered page
// --------------------------------------------------------------------------------------------- //

const words = ref(0);

// Splitting the whole page is only worth it when the estimate can be shown.
const measured = computed(() => !!meta.value && meta.value.readingTime !== false);

function measure() {
    if (!measured.value) {
        words.value = 0;

        return;
    }

    words.value =
        document.querySelector('.vp-doc')?.textContent?.trim().split(/\s+/).filter(Boolean)
            .length ?? 0;
}

onMounted(() => nextTick(measure));
watch([
    () => page.value.relativePath,
    measured
], () => nextTick(measure));

const minutes = computed(() => {
    if (!meta.value || meta.value.readingTime === false || !words.value) {
        return null;
    }

    return Math.max(1, Math.round(words.value / (meta.value.wordsPerMinute ?? 200)));
});

// --------------------------------------------------------------------------------------------- //
// Last updated
// --------------------------------------------------------------------------------------------- //

const updated = computed(() => {
    if (!meta.value || meta.value.lastUpdated === false || !page.value.lastUpdated) {
        return null;
    }

    return formatRelative(page.value.lastUpdated, lang.value);
});

const updatedAt = computed(() =>
    page.value.lastUpdated ? new Date(page.value.lastUpdated).toISOString() : undefined
);

// --------------------------------------------------------------------------------------------- //
// Page actions menu
//
// Copying the Markdown source needs `ffMarkdown`, put on the page data at build time by
// `ffTransformPageData`; without it that action stays out. `copyMarkdown` is the older spelling of
// `pageActions: { copyMarkdown: true }`.
// --------------------------------------------------------------------------------------------- //

// 24px viewBox paths: the interface icons are stroked, the brand ones (Simple Icons, CC0) filled.
const icons = {
    copy: 'M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2zM4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2',
    check: 'M20 6 9 17l-5-5',
    link: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
    share: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13',
    chevron: 'm6 9 6 6 6-6',
    external: 'M7 7h10v10M7 17 17 7'
};

const brands: Record<Network, string> = {
    x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    bluesky: 'M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z',
    mastodon: 'M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z'
};

const networks: Record<
    Network,
    {
        name: string
        url: (url: string, text: string, instance: string) => string
    }
> = {
    x: {
        name: 'X',
        url: (url, text) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    },
    linkedin: {
        name: 'LinkedIn',
        url: (url) =>
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    bluesky: {
        name: 'Bluesky',
        url: (url, text) =>
            `https://bsky.app/intent/compose?text=${encodeURIComponent(`${text} ${url}`)}`
    },
    mastodon: {
        name: 'Mastodon',
        url: (url, text, instance) =>
            `https://${instance}/share?text=${encodeURIComponent(`${text} ${url}`)}`
    }
};

// Renders one of the paths above.
const MetaIcon = (props: { d: string;
    brand?: boolean }) =>
    h(
        'svg',
        {
            class: [
                'ff-doc-meta-icon',
                {
                    brand: props.brand 
                }
            ],
            viewBox: '0 0 24 24',
            'aria-hidden': 'true'
        },
        h('path', {
            d: props.d 
        })
    );

MetaIcon.props = [
    'd',
    'brand'
];

const markdown = computed(() => (page.value as { ffMarkdown?: string }).ffMarkdown ?? '');

const actions = computed(() => {
    const resolved = resolvePageActions(options.value);

    return {
        ...resolved,
        markdown: resolved.markdown && !!markdown.value 
    };
});

const available = computed(
    () => actions.value.markdown || actions.value.link || actions.value.share.length > 0
);

// The main part of the split button copies the link, else the Markdown; with neither, the single
// "Share" trigger takes its place. The menu never repeats the main action.
const main = computed(() =>
    actions.value.link ? 'link' : actions.value.markdown ? 'markdown' : null
);
const menuMarkdown = computed(() => main.value === 'link' && actions.value.markdown);
const hasMenu = computed(() => menuMarkdown.value || actions.value.share.length > 0);

// The page address without its query or hash, read on the client only.
function pageAddress() {
    return window.location.origin + window.location.pathname;
}

const { copied: markdownCopied, copy: copyMarkdown } = useCopy(markdown);
const { copied: linkCopied, copy: copyLink } = useCopy(pageAddress);

const copied = computed(() => markdownCopied.value || linkCopied.value);
const message = computed(() =>
    linkCopied.value ? labels.value.linkCopied : markdownCopied.value ? labels.value.heroCopied : ''
);
const mainLabel = computed(
    () =>
        message.value ||
        (main.value === 'link' ? labels.value.copyLink : labels.value.copyMarkdown)
);

const root = ref<HTMLElement>();
const trigger = ref<HTMLButtonElement>();
const open = ref(false);
const pageUrl = ref('');
const menuId = useId();

const shares = computed(() =>
    actions.value.share
        .filter((id) => networks[id])
        .map((id) => ({
            id,
            name: networks[id].name,
            href: networks[id].url(pageUrl.value, page.value.title, actions.value.instance)
        }))
);

function toggle() {
    open.value = !open.value;

    if (open.value) {
        // Read on the client only, so the page renders the same on the server.
        pageUrl.value = pageAddress();
        nextTick(() => root.value?.querySelector<HTMLElement>('[role="menuitem"]')?.focus());
    }
}

function close(refocus = false) {
    open.value = false;

    if (refocus) {
        trigger.value?.focus();
    }
}

// A link is only followed once its handlers return, so the menu leaves after it.
function closeSoon() {
    setTimeout(() => close());
}

function onKeydown(event: KeyboardEvent) {
    if (!open.value) {
        return;
    }

    if (event.key === 'Escape') {
        close(true);

        return;
    }

    const step = {
        ArrowDown: 1,
        ArrowUp: -1
    }[event.key];

    if (!step) {
        return;
    }

    event.preventDefault();

    const list = Array.from(root.value?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    const index = list.indexOf(document.activeElement as HTMLElement);

    list[index < 0 && step < 0 ? list.length - 1 : (index + step + list.length) % list.length]?.focus();
}

// A null target is a click on a control that takes no focus (Safari buttons): not a way out.
function onFocusout(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;

    if (open.value && next && !root.value?.contains(next)) {
        close();
    }
}

function onOutside(event: Event) {
    if (open.value && !root.value?.contains(event.target as Node)) {
        close();
    }
}

onMounted(() => document.addEventListener('pointerdown', onOutside));
onUnmounted(() => document.removeEventListener('pointerdown', onOutside));
watch(
    () => page.value.relativePath,
    () => close()
);

// The block stays for the menu even when the kicker itself is switched off.
const hidden = computed(
    () => (!meta.value && !available.value) || frontmatter.value.layout === 'home'
);
</script>

<template>
  <div
    v-if="!hidden"
    class="ff-doc-meta ff-label"
  >
    <span
      v-if="section"
      class="ff-doc-meta-item"
    >{{ section }}</span>

    <ClientOnly>
      <span
        v-if="minutes"
        class="ff-doc-meta-item"
      >
        {{ format(labels.readingTime, minutes) }}
      </span>
      <time
        v-if="updated"
        class="ff-doc-meta-item"
        :datetime="updatedAt"
      >
        {{ format(labels.lastUpdated, updated) }}
      </time>
    </ClientOnly>

    <div
      v-if="available"
      ref="root"
      class="ff-doc-meta-actions"
      @keydown="onKeydown"
      @focusout="onFocusout"
    >
      <div
        class="ff-doc-meta-split"
        :class="{ copied }"
      >
        <button
          v-if="main"
          type="button"
          class="ff-doc-meta-main"
          @click="main === 'link' ? copyLink() : copyMarkdown()"
        >
          <MetaIcon :d="copied ? icons.check : main === 'link' ? icons.link : icons.copy" />
          {{ mainLabel }}
        </button>

        <button
          v-if="!main || hasMenu"
          ref="trigger"
          type="button"
          class="ff-doc-meta-toggle"
          :class="{ open }"
          aria-haspopup="menu"
          :aria-expanded="open"
          :aria-controls="open ? menuId : undefined"
          :aria-label="main ? labels.pageActions : undefined"
          @click="toggle"
        >
          <template v-if="!main">
            <MetaIcon :d="icons.share" />
            {{ labels.share }}
          </template>
          <MetaIcon
            class="ff-doc-meta-chevron"
            :d="icons.chevron"
          />
        </button>
      </div>

      <span
        class="visually-hidden"
        aria-live="polite"
      >{{ message }}</span>

      <div
        v-if="open"
        :id="menuId"
        class="ff-doc-meta-menu"
        role="menu"
      >
        <button
          v-if="menuMarkdown"
          type="button"
          role="menuitem"
          @click="copyMarkdown(); close(true)"
        >
          <MetaIcon :d="icons.copy" />
          <span class="ff-doc-meta-menu-text">
            {{ labels.copyMarkdown }}
            <small>{{ labels.copyMarkdownHint }}</small>
          </span>
        </button>

        <hr
          v-if="menuMarkdown && shares.length"
          role="separator"
        >

        <a
          v-for="share in shares"
          :key="share.id"
          role="menuitem"
          :href="share.href"
          target="_blank"
          rel="noopener noreferrer"
          @click="closeSoon"
        >
          <MetaIcon
            :d="brands[share.id]"
            brand
          />
          <span class="ff-doc-meta-menu-text">{{ format(labels.shareOn, share.name) }}</span>
          <MetaIcon
            class="ff-doc-meta-external"
            :d="icons.external"
          />
        </a>
      </div>
    </div>
  </div>
</template>
