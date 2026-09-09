<script setup lang="ts">
import { computed, useSlots } from 'vue'
import DefaultTheme from 'vitepress/theme'
import FfBackToTop from '../components/FfBackToTop.vue'
import FfBanner from '../components/FfBanner.vue'
import FfDocMeta from '../components/FfDocMeta.vue'

const { Layout } = DefaultTheme

// Three slots carry the additions of this theme; every other slot the site passes in is forwarded
// untouched, so the whole default slot surface keeps working.
const owned = ['layout-top', 'doc-before', 'layout-bottom']

const slots = useSlots()
const forwarded = computed(() => Object.keys(slots).filter((name) => !owned.includes(name)))
</script>

<template>
    <div class="ff-theme">
        <div class="ff-progress" aria-hidden="true" />

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

            <template v-for="name in forwarded" :key="name" #[name]="data">
                <slot :name="name" v-bind="data ?? {}" />
            </template>
        </Layout>
    </div>
</template>
