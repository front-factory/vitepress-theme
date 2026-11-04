<script setup lang="ts">
import { computed } from 'vue';
import { VPFlyout } from '../internal';
import { useLabels, useThemeOptions } from '../composables/options';

const options = useThemeOptions();
const labels = useLabels();

const versions = computed(() => options.value.versions);
</script>

<template>
  <VPFlyout
    v-if="versions"
    class="ff-version-switcher"
    :button="versions.current"
    :items="versions.items"
    :label="`${labels.versionSwitcher} ${versions.current}`"
  />
</template>
