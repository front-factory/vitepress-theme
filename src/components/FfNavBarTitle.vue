<script setup lang="ts">
// Replica of the default theme's VPNavBarTitle, with the version switcher rendered beside the
// title link. Its `nav-bar-title-after` slot sits inside that link, where an interactive menu
// would be invalid markup and every click would navigate home.
import { computed } from 'vue';
import { useData } from 'vitepress';
import {
    normalizeLink, useLangs, useLayout, VPImage
} from '../internal';
import FfVersionSwitcher from './FfVersionSwitcher.vue';

const { site, theme } = useData();
const { hasSidebar } = useLayout();
const { currentLang } = useLangs();

const logoLink = computed(() =>
    typeof theme.value.logoLink === 'string' ? {
        link: theme.value.logoLink 
    } : theme.value.logoLink
);

// Plain-text title, surfaced as a native tooltip since the sidebar column truncates it.
const textTitle = computed(() => {
    if (theme.value.siteTitle === false) {
        return undefined;
    }

    const raw: string = theme.value.siteTitle ?? site.value.title;

    return raw.replace(/<[^>]+>/g, '').trim() || undefined;
});
</script>

<template>
  <div
    class="VPNavBarTitle"
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <a
      class="title"
      :href="logoLink?.link ?? normalizeLink(currentLang.link)"
      :rel="logoLink?.rel"
      :target="logoLink?.target"
      :title="textTitle"
    >
      <slot name="nav-bar-title-before" />
      <VPImage
        v-if="theme.logo"
        class="logo"
        :image="theme.logo"
      />
      <span
        v-if="theme.siteTitle"
        dir="auto"
        v-html="theme.siteTitle"
      />
      <span v-else-if="theme.siteTitle === undefined">{{ site.title }}</span>
      <slot name="nav-bar-title-after" />
    </a>

    <FfVersionSwitcher />
  </div>
</template>
