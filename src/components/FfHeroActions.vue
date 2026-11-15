<script setup lang="ts">
import { isExternal, normalizeLink } from '../internal';
import type { HeroAction } from './FfHero.vue';

defineProps<{
    actions: HeroAction[]
}>();

// Like VPButton: an external link opens in a new tab and drops the referrer unless the action
// says otherwise.
function target(action: HeroAction) {
    return action.target ?? (isExternal(action.link) ? '_blank' : undefined);
}

function rel(action: HeroAction) {
    if (action.rel) {
        return action.rel;
    }

    if (isExternal(action.link)) {
        return 'noreferrer';
    }

    return target(action) === '_blank' ? 'noopener' : undefined;
}
</script>

<template>
  <div class="ff-hero-actions">
    <slot name="before" />

    <a
      v-for="action in actions"
      :key="action.link"
      class="ff-btn"
      :class="`ff-btn-${action.theme ?? 'brand'}`"
      :href="normalizeLink(action.link)"
      :target="target(action)"
      :rel="rel(action)"
    >
      {{ action.text }}
    </a>
  </div>
</template>
