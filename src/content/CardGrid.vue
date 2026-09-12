<script setup lang="ts">
withDefaults(defineProps<{ columns?: number | string }>(), {
    columns: 2 
});
</script>

<template>
  <div
    class="ff-card-grid"
    :style="{ '--ff-card-columns': columns }"
  >
    <slot />
  </div>
</template>
