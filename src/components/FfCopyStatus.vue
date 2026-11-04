<script setup lang="ts">
import {
    onMounted, onUnmounted, ref 
} from 'vue';
import { useLabels } from '../composables/options';

const labels = useLabels();
const message = ref('');

// VitePress confirms a code block copy with a CSS `::before` only, which screen readers never
// hear. Its click handler adds `.copied` once the clipboard write succeeds, so the class is what
// gets watched rather than the click itself.
const BUTTON = 'div[class*="language-"] > button.copy';

let timer: ReturnType<typeof setTimeout> | undefined;

function announce() {
    message.value = labels.value.heroCopied;

    clearTimeout(timer);
    timer = setTimeout(() => (message.value = ''), 2000);
}

function onClick(event: MouseEvent) {
    const button = (event.target as Element | null)?.closest?.(BUTTON);

    if (!button) {
        return;
    }

    // Cleared first, so a second copy within two seconds is announced again.
    message.value = '';

    const observer = new MutationObserver(() => {
        if (button.classList.contains('copied')) {
            observer.disconnect();
            announce();
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
    clearTimeout(timer);
});
</script>

<template>
  <span
    class="visually-hidden"
    aria-live="polite"
  >{{ message }}</span>
</template>
