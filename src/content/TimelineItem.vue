<script setup lang="ts">
import { inject, ref } from 'vue';
import { TIMELINE_LEVEL } from './timeline';

// h3 outside a <Timeline>, matching the timeline's own default.
const level = inject(TIMELINE_LEVEL, ref(3));

defineProps<{
    /** Date or period, printed as a small monospaced label above the title. */
    date?: string
    /** Heading of the entry. */
    title?: string
}>();
</script>

<template>
  <section class="ff-timeline-item">
    <p
      v-if="date"
      class="ff-timeline-date ff-label"
    >
      {{ date }}
    </p>

    <component
      :is="`h${level}`"
      v-if="title"
      class="ff-timeline-title"
    >
      {{ title }}
    </component>

    <div class="ff-timeline-body">
      <slot />
    </div>
  </section>
</template>
