<script setup lang="ts">
import {
    computed, onMounted, onUnmounted, ref 
} from 'vue';
import { useData } from 'vitepress';
import { useLabels, useThemeOptions } from '../composables/options';

const { theme } = useData();
const options = useThemeOptions();
const labels = useLabels();

// The visible text is the accessible name; the tooltip reuses the default theme's own option,
// so a site that already localised its mobile return-to-top link gets this one for free.
const title = computed(() => theme.value.returnToTopLabel ?? 'Return to top');

const enabled = computed(() => options.value.backToTop !== false);

const visible = ref(false);

function update() {
    visible.value = window.scrollY > window.innerHeight;
}

// At most one state update per frame, however many scroll events fire.
let frame = 0;

function onScroll() {
    if (!frame) {
        frame = requestAnimationFrame(() => {
            frame = 0;
            update();
        });
    }
}

function toTop() {
    window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
}

onMounted(() => {
    update();
    window.addEventListener('scroll', onScroll, {
        passive: true 
    });
});

onUnmounted(() => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <ClientOnly>
    <button
      v-if="enabled"
      type="button"
      class="ff-to-top ff-label"
      :class="{ 'is-visible': visible }"
      :inert="visible ? undefined : true"
      :title="title"
      @click="toTop"
    >
      <span aria-hidden="true">&#8593;</span>
      <span>{{ labels.backToTop }}</span>
    </button>
  </ClientOnly>
</template>
