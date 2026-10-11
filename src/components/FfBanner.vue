<script setup lang="ts">
import {
    computed, onMounted, onUnmounted, ref 
} from 'vue';
import { useLabels, useThemeOptions } from '../composables/options';

const options = useThemeOptions();
const labels = useLabels();
const banner = computed(() => options.value.banner);

const el = ref<HTMLElement>();
let observer: ResizeObserver | undefined;

// The class is set on <html> by an inline script injected in the head, so a dismissed banner never
// paints. See transformHead() in config.js.
const DISMISSED = 'ff-banner-dismissed';

function height() {
    const root = document.documentElement;

    if (!banner.value || root.classList.contains(DISMISSED)) {
        root.style.removeProperty('--vp-layout-top-height');

        return;
    }

    root.style.setProperty('--vp-layout-top-height', `${el.value?.offsetHeight ?? 0}px`);
}

function dismiss() {
    if (!banner.value) {
        return;
    }

    try {
        localStorage.setItem(`ff-banner-${banner.value.id}`, 'dismissed');
    } catch {
        // Private mode or full quota: the banner is dismissed for this page view only.
    }

    document.documentElement.classList.add(DISMISSED);
    height();
}

onMounted(() => {
    height();

    if (el.value) {
        observer = new ResizeObserver(height);
        observer.observe(el.value);
    }
});

onUnmounted(() => {
    observer?.disconnect();
    document.documentElement.style.removeProperty('--vp-layout-top-height');
});
</script>

<template>
  <div
    v-if="banner"
    ref="el"
    class="ff-banner"
    :data-variant="banner.variant ?? 'ink'"
    :data-gradient="banner.gradient || undefined"
  >
    <component
      :is="banner.link ? 'a' : 'div'"
      class="ff-banner-body"
      :href="banner.link"
    >
      <span
        v-if="banner.icon"
        class="ff-banner-icon"
        aria-hidden="true"
      >{{ banner.icon }}</span>
      <span
        class="ff-banner-text"
        v-html="banner.text"
      />
      <span
        v-if="banner.link"
        class="ff-banner-cta"
      >
        {{ banner.linkText ?? 'Read more' }}
        <span aria-hidden="true">&#8594;</span>
      </span>
    </component>

    <button
      type="button"
      class="ff-banner-close"
      :aria-label="labels.bannerDismiss"
      @click="dismiss"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" />
      </svg>
    </button>
  </div>
</template>
