<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { useLayout } from '../internal'
import { format, useLabels, useThemeOptions } from '../composables/options'
import type { DefaultTheme } from 'vitepress/theme'

const { page, frontmatter, lang } = useData()
const { sidebarGroups } = useLayout()
const options = useThemeOptions()
const labels = useLabels()

const meta = computed(() => {
    if (options.value.meta === false || frontmatter.value.docMeta === false) return null

    return options.value.meta ?? {}
})

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
        .replace(/\/$/, '')
}

function contains(items: DefaultTheme.SidebarItem[], path: string): boolean {
    return items.some(
        (item) =>
            (item.link && normalize(item.link) === path) || contains(item.items ?? [], path)
    )
}

const section = computed(() => {
    if (!meta.value || meta.value.section === false) return null
    if (frontmatter.value.section) return String(frontmatter.value.section)

    const path = normalize(page.value.relativePath)

    return sidebarGroups.value.find((group) => contains(group.items ?? [], path))?.text ?? null
})

// --------------------------------------------------------------------------------------------- //
// Reading time, measured on the rendered page
// --------------------------------------------------------------------------------------------- //

const words = ref(0)

function measure() {
    words.value =
        document.querySelector('.vp-doc')?.textContent?.trim().split(/\s+/).filter(Boolean)
            .length ?? 0
}

onMounted(() => nextTick(measure))
watch(() => page.value.relativePath, () => nextTick(measure))

const minutes = computed(() => {
    if (!meta.value || meta.value.readingTime === false || !words.value) return null

    return Math.max(1, Math.round(words.value / (meta.value.wordsPerMinute ?? 200)))
})

// --------------------------------------------------------------------------------------------- //
// Last updated
// --------------------------------------------------------------------------------------------- //

const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000000],
    ['month', 2592000000],
    ['week', 604800000],
    ['day', 86400000],
    ['hour', 3600000],
    ['minute', 60000]
]

const updated = computed(() => {
    if (!meta.value || meta.value.lastUpdated === false || !page.value.lastUpdated) return null

    const elapsed = page.value.lastUpdated - Date.now()
    const relative = new Intl.RelativeTimeFormat(lang.value, { numeric: 'auto' })

    for (const [unit, ms] of units) {
        if (Math.abs(elapsed) >= ms) return relative.format(Math.round(elapsed / ms), unit)
    }

    return relative.format(0, 'minute')
})

const hidden = computed(() => !meta.value || frontmatter.value.layout === 'home')
</script>

<template>
    <div v-if="!hidden" class="ff-doc-meta ff-label">
        <span v-if="section" class="ff-doc-meta-item">{{ section }}</span>

        <ClientOnly>
            <span v-if="minutes" class="ff-doc-meta-item">
                {{ format(labels.readingTime, minutes) }}
            </span>
            <span v-if="updated" class="ff-doc-meta-item">
                {{ format(labels.lastUpdated, updated) }}
            </span>
        </ClientOnly>
    </div>
</template>
