<script setup lang="ts">
import { computed } from 'vue';
import { format, useLabels } from '../composables/options';
import { VPBadge } from '../internal';

const labels = useLabels();

const props = defineProps<{
    /** Text of the badge; for `since`, the version, printed through the `apiSince` label. */
    text?: string
    /** `tip`, `info`, `warning` and `danger` come from VitePress; `new`, `beta`, `deprecated` and `since` from the theme. */
    type?: string
}>();

const shown = computed(() => (props.type === 'since' && props.text ? format(labels.value.apiSince, props.text) : props.text));
</script>

<!-- VPBadge types `type` as a closed union but only uses it as a class name, hence the cast. -->
<template>
  <VPBadge
    :type="(type as 'tip' | undefined)"
    :text="shown"
  >
    <slot />
  </VPBadge>
</template>
