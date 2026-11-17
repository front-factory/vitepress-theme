<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData } from 'vitepress';
import { useLabels, useThemeOptions } from '../composables/options';
import { useFrameListener } from '../composables/frame';

const { theme } = useData();
const options = useThemeOptions();
const labels = useLabels();

// The visible text is the accessible name; the tooltip reuses the default theme's own option,
// so a site that already localised its mobile return-to-top link gets this one for free.
const title = computed(() => theme.value.returnToTopLabel ?? labels.value.returnToTop);

const enabled = computed(() => options.value.backToTop !== false);

const visible = ref(false);

function update() {
    visible.value = window.scrollY > window.innerHeight;
}

function toTop() {
    window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
}

useFrameListener(enabled, update, [
    'scroll'
]);
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
