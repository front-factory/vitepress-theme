<script setup lang="ts">
import { VPLink } from '../internal';
import { cardLinkProps } from '../composables/link';

const props = defineProps<{
    title: string
    /** Inline SVG or emoji shown above the title. */
    icon?: string
    link?: string
    rel?: string
    target?: string
}>();
</script>

<template>
  <VPLink
    class="ff-card"
    v-bind="cardLinkProps(props.link, props.rel, props.target)"
  >
    <span
      v-if="icon"
      class="ff-card-icon"
      v-html="icon"
    />

    <p class="ff-card-title">
      {{ title }}
    </p>

    <div class="ff-card-body">
      <slot />
    </div>
  </VPLink>
</template>
