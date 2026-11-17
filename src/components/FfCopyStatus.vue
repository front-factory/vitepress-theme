<script setup lang="ts">
import {
    computed, onMounted, onUnmounted 
} from 'vue';
import { useLabels } from '../composables/options';
import { useTransientFlag } from '../composables/transient';

const labels = useLabels();
const { active, start, stop } = useTransientFlag();
const message = computed(() => (active.value ? labels.value.codeCopied : ''));

// VitePress confirms a code block copy with a CSS `::before` only, which screen readers never
// hear. Its click handler adds `.copied` once the clipboard write succeeds, so the class is what
// gets watched rather than the click itself.
const BUTTON = 'div[class*="language-"] > button.copy';

function onClick(event: MouseEvent) {
    const button = (event.target as Element | null)?.closest?.(BUTTON);

    if (!button) {
        return;
    }

    // Cleared first, so a second copy within two seconds is announced again.
    stop();

    const observer = new MutationObserver(() => {
        if (button.classList.contains('copied')) {
            observer.disconnect();
            start();
        }
    });

    observer.observe(button, {
        attributeFilter: [
            'class'
        ]
    });

    // A failed write never adds the class: stop watching once the confirmation window is over.
    setTimeout(() => observer.disconnect(), 2000);
}

onMounted(() => window.addEventListener('click', onClick));

onUnmounted(() => {
    window.removeEventListener('click', onClick);
});
</script>

<template>
  <span
    class="visually-hidden"
    aria-live="polite"
  >{{ message }}</span>
</template>
