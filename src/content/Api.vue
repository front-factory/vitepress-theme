<script setup lang="ts">
import { format, useLabels } from '../composables/options';

const labels = useLabels();

defineProps<{
    /** Symbol being documented, e.g. `refs()`. */
    name: string
    /** Free-form kind label, e.g. `function`, `mixin`, `option`. */
    kind?: string
    /** One-line signature shown under the heading. */
    signature?: string
    /** Version the symbol appeared in. */
    since?: string
    /** Marks the symbol as deprecated. */
    deprecated?: boolean
}>();
</script>

<template>
  <section
    class="ff-api"
    :class="{ 'is-deprecated': deprecated }"
  >
    <header class="ff-api-head">
      <code class="ff-api-name">{{ name }}</code>

      <span
        v-if="kind"
        class="ff-api-kind ff-label"
      >{{ kind }}</span>
      <span
        v-if="since"
        class="ff-api-tag ff-label"
      >{{ format(labels.apiSince, since) }}</span>
      <span
        v-if="deprecated"
        class="ff-api-tag ff-api-deprecated ff-label"
      >{{ labels.apiDeprecated }}</span>
    </header>

    <p
      v-if="signature"
      class="ff-api-signature"
    >
      <code>{{ signature }}</code>
    </p>

    <div class="ff-api-body">
      <slot />
    </div>
  </section>
</template>
