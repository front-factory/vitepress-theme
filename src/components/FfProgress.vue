<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData } from 'vitepress';
import { useThemeOptions } from '../composables/options';
import { useFrameListener } from '../composables/frame';

const { frontmatter } = useData();
const options = useThemeOptions();

const enabled = computed(() => options.value.progress === true && frontmatter.value.progress !== false);

const progress = ref(0);

function update() {
    const range = document.documentElement.scrollHeight - window.innerHeight;

    progress.value = range > 0 ? Math.min(Math.max(window.scrollY / range, 0), 1) : 0;
}

useFrameListener(enabled, update, [
    'scroll',
    'resize'
]);
</script>

<template>
  <ClientOnly>
    <div
      v-if="enabled"
      class="ff-progress"
      aria-hidden="true"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </ClientOnly>
</template>
