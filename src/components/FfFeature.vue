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
  <!-- Only the title is the link, stretched over the card in CSS: wrapping the whole card made the
       heading, details and call to action all part of the link's accessible name. -->
  <article
    class="VPFeature ff-feature"
    :class="{ 'ff-feature-linked': link }"
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

    <h2 class="ff-feature-title">
      <VPLink
        v-if="link"
        class="ff-feature-anchor"
        v-bind="cardLinkProps(props.link, props.rel, props.target)"
      >
        <span v-html="title" />
      </VPLink>
      <span
        v-else
        v-html="title"
      />
    </h2>

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
  </article>
</template>
