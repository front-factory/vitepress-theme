<script setup lang="ts">
import { provide, toRef } from 'vue';
import { TIMELINE_LEVEL } from './timeline';

const props = withDefaults(defineProps<{
    /** Heading level of the entry titles, to fit the outline the timeline sits in. */
    level?: 2 | 3 | 4 | 5 | 6
}>(), {
    level: 3
});

provide(TIMELINE_LEVEL, toRef(props, 'level'));
</script>

<template>
  <div class="ff-timeline">
    <slot />
  </div>
</template>
