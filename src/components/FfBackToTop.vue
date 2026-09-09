<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useThemeOptions } from '../composables/options'

const options = useThemeOptions()
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
            @click="toTop"
        >
            <span aria-hidden="true">&#8593;</span>
            <span>Top</span>
        </button>
    </ClientOnly>
</template>
