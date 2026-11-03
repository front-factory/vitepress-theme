<script setup lang="ts">
import {
    computed, nextTick, onMounted, ref, watch 
} from 'vue';
import { useData } from 'vitepress';
import { useLayout } from '../internal';
import { useCopy } from '../composables/tabs';
import { formatRelative } from '../composables/relativeTime';
import {
    format, useLabels, useThemeOptions 
} from '../composables/options';
import type { DefaultTheme } from 'vitepress/theme';

const { page, frontmatter, lang } = useData();
const { sidebarGroups } = useLayout();
const options = useThemeOptions();
const labels = useLabels();

const meta = computed(() => {
    if (options.value.meta === false || frontmatter.value.docMeta === false) {
        return null;
    }

    return options.value.meta ?? {};
});

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
// Copy as Markdown
//
// The source is put on the page data at build time by `ffTransformPageData`; without it the
// button has nothing to copy and stays out.
// --------------------------------------------------------------------------------------------- //

const markdown = computed(() => (page.value as { ffMarkdown?: string }).ffMarkdown ?? '');

const copyable = computed(() => options.value.copyMarkdown === true && !!markdown.value);

const { copied, copy } = useCopy(markdown);

// The block stays for the button even when the kicker itself is switched off.
const hidden = computed(
    () => (!meta.value && !copyable.value) || frontmatter.value.layout === 'home'
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

    <button
      v-if="copyable"
      type="button"
      class="ff-doc-meta-copy"
      :class="{ copied }"
      @click="copy"
    >
      <span aria-live="polite">{{ copied ? labels.heroCopied : labels.copyMarkdown }}</span>
    </button>
  </div>
</template>
