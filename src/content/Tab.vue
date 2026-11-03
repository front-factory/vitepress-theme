<script setup lang="ts">
// A marker: <Tabs> reads `label` off this vnode to build the tab list, and renders it as a panel.
defineProps<{
    /** Text of the tab; also the value shared between groups with the same `syncKey`. */
    label: string
}>();
</script>

<template>
  <slot />
</template>
