<script setup lang="ts">
import {
    computed, nextTick, ref, watch
} from 'vue';
import { useData } from 'vitepress';
import { useLabels, useThemeOptions } from '../composables/options';
import { resolveOption } from '../../node/options.js';

const { page, frontmatter, lang } = useData();
const options = useThemeOptions();
const labels = useLabels();

const config = computed(() =>
    resolveOption(options.value.feedback, frontmatter.value.feedback === false)
);

const question = computed(() => config.value?.question || labels.value.feedbackQuestion);

const voted = ref(false);
const thanks = ref<HTMLElement | null>(null);

// The widget is reused across client-side navigation, so each page starts unanswered.
watch(() => page.value.relativePath, () => (voted.value = false));

function vote(value: 'yes' | 'no') {
    const payload = {
        page: page.value.relativePath,
        value,
        lang: lang.value
    };

    voted.value = true;

    // The buttons leave the DOM with the vote: hand focus to the thank-you line instead of <body>.
    nextTick(() => thanks.value?.focus());

    // A string keeps the request CORS-safelisted (text/plain); a JSON Blob would trigger a
    // preflight that cross-origin endpoints rarely answer.
    if (config.value?.url) {
        navigator.sendBeacon(config.value.url, JSON.stringify(payload));
    }

    // Always emitted, so a site can forward the vote itself (a function cannot live in `themeConfig`).
    window.dispatchEvent(new CustomEvent('ff:feedback', {
        detail: payload
    }));
}
</script>

<template>
  <div
    v-if="config"
    class="ff-feedback"
  >
    <p
      v-if="!voted"
      class="ff-feedback-question ff-label"
    >
      {{ question }}
    </p>

    <div
      v-if="!voted"
      class="ff-feedback-actions"
    >
      <button
        type="button"
        class="ff-feedback-button ff-label"
        @click="vote('yes')"
      >
        {{ labels.feedbackYes }}
      </button>
      <button
        type="button"
        class="ff-feedback-button ff-label"
        @click="vote('no')"
      >
        {{ labels.feedbackNo }}
      </button>
    </div>

    <p
      ref="thanks"
      class="ff-feedback-thanks ff-label"
      tabindex="-1"
      aria-live="polite"
    >
      {{ voted ? labels.feedbackThanks : '' }}
    </p>
  </div>
</template>
