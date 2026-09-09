<script setup lang="ts">
import { VPLink } from '../internal'

defineProps<{
    title: string
    /** Inline SVG or emoji shown above the title. */
    icon?: string
    link?: string
    rel?: string
    target?: string
}>()
</script>

<template>
    <VPLink
        class="ff-card"
        :href="link"
        :rel="rel"
        :target="target"
        :no-icon="true"
        :tag="link ? 'a' : 'div'"
    >
        <span v-if="icon" class="ff-card-icon" v-html="icon" />

        <p class="ff-card-title">{{ title }}</p>

        <div class="ff-card-body">
            <slot />
        </div>
    </VPLink>
</template>
