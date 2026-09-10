<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { format, useLabels } from '../composables/options'
import type { HeroCommandTab } from '../types'

// Used from both hero panel positions (inline and beside the headline, see FfHero), which are
// mutually exclusive — so the active tab lives here rather than being lifted to the parent.
const props = defineProps<{
    command: string | HeroCommandTab[]
    /** No actions sit under this command — print the bare line, without the "Install" heading. */
    bare?: boolean
}>()

const labels = useLabels()

const tabs = computed<HeroCommandTab[] | undefined>(() =>
    Array.isArray(props.command) ? props.command : undefined
)

const activeTab = ref(0)

// Client-side navigation can swap the tabs a shorter or longer array without remounting this
// component (two home pages in the same site), so the index is reset rather than left pointing
// past the end.
watch(tabs, () => (activeTab.value = 0))

const activeCommand = computed<string>(() =>
    tabs.value ? (tabs.value[activeTab.value]?.value ?? '') : (props.command as string)
)

const copied = ref(false)

async function copy() {
    if (!activeCommand.value) return

    await navigator.clipboard.writeText(activeCommand.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
    <div class="ff-hero-command-panel">
        <p v-if="!bare" class="ff-hero-panel-label ff-label">{{ labels.heroInstall }}</p>

        <div v-if="tabs" class="ff-hero-command-tabs" role="tablist">
            <button
                v-for="(tab, index) in tabs"
                :key="tab.label"
                type="button"
                role="tab"
                class="ff-hero-command-tab"
                :class="{ active: index === activeTab }"
                :aria-selected="index === activeTab"
                @click="activeTab = index"
            >
                {{ tab.label }}
            </button>
        </div>

        <div class="ff-hero-command">
            <code>
                <span class="ff-hero-prompt" aria-hidden="true">$</span>
                {{ activeCommand }}
            </code>

            <span class="ff-hero-copy-group">
                <span v-if="copied" class="ff-hero-copied ff-label">{{ labels.heroCopied }}</span>

                <button
                    type="button"
                    class="ff-hero-copy"
                    :class="{ copied }"
                    :title="format(labels.heroCopyLabel, activeCommand)"
                    :aria-label="format(labels.heroCopyLabel, activeCommand)"
                    @click="copy"
                />
            </span>
        </div>
    </div>
</template>
