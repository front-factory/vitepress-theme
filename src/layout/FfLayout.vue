<script setup lang="ts">
import { computed, useSlots } from 'vue';
import DefaultTheme from 'vitepress/theme';
import FfBackToTop from '../components/FfBackToTop.vue';
import FfBanner from '../components/FfBanner.vue';
import FfDocMeta from '../components/FfDocMeta.vue';
import { useThemeOptions } from '../composables/options';

const { Layout } = DefaultTheme;
const options = useThemeOptions();

// Three slots carry the additions of this theme; every other slot the site passes in is forwarded
// untouched, so the whole default slot surface keeps working.
const owned = [
    'layout-top',
    'doc-before',
    'layout-bottom'
];

const slots = useSlots();
const forwarded = computed(() => Object.keys(slots).filter((name) => !owned.includes(name)));
</script>

<template>
  <div
    class="ff-theme"
    :data-nav-order="options.navOrder ?? 'search-first'"
    :data-nav-sticky="options.navSticky === false ? 'false' : 'true'"
  >
    <Layout>
      <template #layout-top>
        <FfBanner />
        <slot name="layout-top" />
      </template>

      <template #doc-before>
        <FfDocMeta />
        <slot name="doc-before" />
      </template>

      <template #layout-bottom>
        <slot name="layout-bottom" />
        <FfBackToTop />
      </template>

      <template
        v-for="name in forwarded"
        :key="name"
        #[name]="data"
      >
        <slot
          :name="name"
          v-bind="data ?? {}"
        />
      </template>
    </Layout>
  </div>
</template>
