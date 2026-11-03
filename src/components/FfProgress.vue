<script setup lang="ts">
import {
    computed, onMounted, ref, watchEffect
} from 'vue';
import { useData } from 'vitepress';
import { useThemeOptions } from '../composables/options';

const { frontmatter } = useData();
const options = useThemeOptions();

const enabled = computed(() => options.value.progress === true && frontmatter.value.progress !== false);

const progress = ref(0);

function update() {
    const range = document.documentElement.scrollHeight - window.innerHeight;

    progress.value = range > 0 ? Math.min(Math.max(window.scrollY / range, 0), 1) : 0;
}

// At most one state update per frame, however many scroll events fire.
let frame = 0;

function onChange() {
    if (!frame) {
        frame = requestAnimationFrame(() => {
            frame = 0;
            update();
        });
    }
}

// Listens only while the bar is enabled, and follows the option if it changes (locale switch,
// per-page frontmatter). The effect is stopped with the component, which runs its cleanup.
onMounted(() => {
    watchEffect((onCleanup) => {
        if (!enabled.value) {
            return;
        }

        update();
        window.addEventListener('scroll', onChange, {
            passive: true
        });

        window.addEventListener('resize', onChange, {
            passive: true
        });

        onCleanup(() => {
            cancelAnimationFrame(frame);
            frame = 0;
            window.removeEventListener('scroll', onChange);
            window.removeEventListener('resize', onChange);
        });
    });
});
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
