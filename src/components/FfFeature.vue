<script setup lang="ts">
import { VPImage, VPLink } from '../internal';
import { cardLinkProps } from '../composables/link';
import type { DefaultTheme } from 'vitepress/theme';

const props = defineProps<{
    icon?: DefaultTheme.FeatureIcon
    title: string
    details?: string | string[]
    link?: string
    linkText?: string
    rel?: string
    target?: string
}>();
</script>

<template>
  <VPLink
    class="VPFeature ff-feature"
    v-bind="cardLinkProps(props.link, props.rel, props.target)"
  >
    <span
      class="ff-feature-index"
      aria-hidden="true"
    />

    <div
      v-if="typeof icon === 'object'"
      class="ff-feature-icon"
    >
      <VPImage
        :image="icon"
        :alt="icon.alt"
        :height="icon.height || 28"
        :width="icon.width || 28"
      />
    </div>
    <div
      v-else-if="icon"
      class="ff-feature-icon"
      aria-hidden="true"
      v-html="icon"
    />

    <h2
      class="ff-feature-title"
      v-html="title"
    />

    <ul
      v-if="Array.isArray(details)"
      class="ff-feature-details"
    >
      <li
        v-for="item in details"
        :key="item"
        v-html="item"
      />
    </ul>
    <p
      v-else-if="details"
      class="ff-feature-details"
      v-html="details"
    />

    <span
      v-if="linkText"
      class="ff-feature-link ff-label"
    >
      {{ linkText }}
      <span aria-hidden="true">&#8594;</span>
    </span>
  </VPLink>
</template>
