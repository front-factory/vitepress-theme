<script setup lang="ts">
import { VPImage, VPLink } from '../internal';
import type { DefaultTheme } from 'vitepress/theme';

defineProps<{
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
    :href="link"
    :rel="rel"
    :target="target"
    :no-icon="true"
    :tag="link ? 'a' : 'div'"
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
