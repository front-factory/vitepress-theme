<script setup lang="ts">
// Same markup as a `::: tip` container, so the margin-note styling of _blocks.scss applies as is.
// It exists for the places a container cannot reach: inside another component, or with a type or
// title bound to data.
withDefaults(defineProps<{
    /** One of the container types: `tip`, `info`, `note`, `important`, `warning`, `danger`, `caution`. */
    type?: string
    /** Label printed above the text. Defaults to the type, like a container. */
    title?: string
}>(), {
    type: 'note',
    title: undefined
});
</script>

<template>
  <div
    class="custom-block"
    :class="type"
  >
    <p class="custom-block-title">
      {{ title ?? type }}
    </p>

    <slot />
  </div>
</template>
