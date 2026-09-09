<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useThemeOptions } from '../composables/options'

const options = useThemeOptions()
const banner = computed(() => options.value.banner)

const el = ref<HTMLElement>()
let observer: ResizeObserver | undefined

// The class is set on <html> by an inline script injected in the head, so a dismissed banner never
// paints. See extendConfig() in config.js.
const DISMISSED = 'ff-banner-dismissed'

function height() {
    const root = document.documentElement

    if (!banner.value || root.classList.contains(DISMISSED)) {
        root.style.removeProperty('--vp-layout-top-height')

        return
    }

    root.style.setProperty('--vp-layout-top-height', `${el.value?.offsetHeight ?? 0}px`)
}

function dismiss() {
    if (!banner.value) return

    localStorage.setItem(`ff-banner-${banner.value.id}`, 'dismissed')
    document.documentElement.classList.add(DISMISSED)
    height()
}

onMounted(() => {
    height()

    if (el.value) {
        observer = new ResizeObserver(height)
        observer.observe(el.value)
    }
})

onUnmounted(() => {
    observer?.disconnect()
    document.documentElement.style.removeProperty('--vp-layout-top-height')
})
</script>

<template>
    <div v-if="banner" ref="el" class="ff-banner">
        <component
            :is="banner.link ? 'a' : 'div'"
            class="ff-banner-body"
            :href="banner.link"
        >
            <span class="ff-banner-text" v-html="banner.text" />
            <span v-if="banner.link" class="ff-banner-cta">
                {{ banner.linkText ?? 'Read more' }}
                <span aria-hidden="true">&#8594;</span>
            </span>
        </component>

        <button
            type="button"
            class="ff-banner-close"
            aria-label="Dismiss announcement"
            @click="dismiss"
        >
            &#215;
        </button>
    </div>
</template>
