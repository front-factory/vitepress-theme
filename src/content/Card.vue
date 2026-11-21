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
  <!-- Only the title is the link, stretched over the card in CSS, as in FfFeature: wrapping the
       whole card put the body in the link's accessible name. -->
  <div
    class="ff-card"
    :class="{ 'ff-card-linked': link }"
  >
    <span
      v-if="icon"
      class="ff-card-icon"
      aria-hidden="true"
      v-html="icon"
    />

    <p class="ff-card-title">
      <VPLink
        v-if="link"
        class="ff-card-anchor"
        v-bind="cardLinkProps(props.link, props.rel, props.target)"
      >
        {{ title }}
      </VPLink>
      <template v-else>
        {{ title }}
      </template>
    </p>

    <div class="ff-card-body">
      <slot />
    </div>
  </div>
</template>
