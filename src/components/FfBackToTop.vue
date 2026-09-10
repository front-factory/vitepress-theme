<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vitepress'
import { useLabels, useThemeOptions } from '../composables/options'

const { theme } = useData()
const options = useThemeOptions()
const labels = useLabels()

// The visible text is the accessible name; the tooltip reuses the default theme's own option,
// so a site that already localised its mobile return-to-top link gets this one for free.
const title = computed(() => theme.value.returnToTopLabel ?? 'Return to top')

const enabled = computed(() => options.value.backToTop !== false)

const visible = ref(false)

function onScroll() {
    visible.value = window.scrollY > window.innerHeight
}

function toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
    <ClientOnly>
        <button
            v-if="enabled"
            type="button"
            class="ff-to-top ff-label"
            :class="{ 'is-visible': visible }"
            :tabindex="visible ? 0 : -1"
            :aria-hidden="!visible"
            :title="title"
            @click="toTop"
        >
            <span aria-hidden="true">&#8593;</span>
            <span>{{ labels.backToTop }}</span>
        </button>
    </ClientOnly>
</template>
