<script setup lang="ts">
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

    <h3
      v-if="title"
      class="ff-timeline-title"
    >
      {{ title }}
    </h3>

    <div class="ff-timeline-body">
      <slot />
    </div>
  </section>
</template>
