<script setup lang="ts">
import { computed, useId } from 'vue';
import { format, useLabels } from '../composables/options';
import { useCopy, useTabs } from '../composables/tabs';
import type { HeroCommandTab } from '../types';

// Used from both hero panel positions (inline and beside the headline, see FfHero), which are
// mutually exclusive — so the active tab lives here rather than being lifted to the parent.
const props = defineProps<{
    command: string | HeroCommandTab[]
    /** No actions sit under this command — print the bare line, without the "Install" heading. */
    bare?: boolean
}>();

const labels = useLabels();

const tabs = computed<HeroCommandTab[] | undefined>(() =>
    Array.isArray(props.command) ? props.command : undefined
);

const { active: activeTab, select, onKeydown } = useTabs(() => tabs.value?.map((tab) => tab.label) ?? []);

const id = useId();

const activeCommand = computed<string>(() =>
    tabs.value ? (tabs.value[activeTab.value]?.value ?? '') : (props.command as string)
);

const { copied, copy } = useCopy(activeCommand);
</script>

<template>
  <div class="ff-hero-command-panel">
    <p
      v-if="!bare"
      class="ff-hero-panel-label ff-label"
    >
      {{ labels.heroInstall }}
    </p>

    <div
      v-if="tabs"
      class="ff-hero-command-tabs"
      role="tablist"
      :aria-label="labels.heroInstall"
      @keydown="onKeydown"
    >
      <button
        v-for="(tab, index) in tabs"
        :id="`${id}-tab-${index}`"
        :key="tab.label"
        type="button"
        role="tab"
        class="ff-hero-command-tab"
        :class="{ active: index === activeTab }"
        :aria-selected="index === activeTab"
        :aria-controls="`${id}-panel`"
        :tabindex="index === activeTab ? 0 : -1"
        @click="select(index)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- One panel whose command follows the active tab, rather than one panel per tab. -->
    <div
      :id="tabs ? `${id}-panel` : undefined"
      class="ff-hero-command"
      :role="tabs ? 'tabpanel' : undefined"
      :aria-labelledby="tabs ? `${id}-tab-${activeTab}` : undefined"
    >
      <code>
        <span
          class="ff-hero-prompt"
          aria-hidden="true"
        >$</span>
        {{ activeCommand }}
      </code>

      <span class="ff-hero-copy-group">
        <span
          v-if="copied"
          class="ff-hero-copied ff-label"
          aria-hidden="true"
        >{{ labels.heroCopied }}</span>

        <span
          class="visually-hidden"
          aria-live="polite"
        >{{ copied ? labels.heroCopied : '' }}</span>

        <button
          type="button"
          class="ff-hero-copy"
          :class="{ copied }"
          :aria-label="format(labels.heroCopyLabel, activeCommand)"
          @click="copy"
        />
      </span>
    </div>
  </div>
</template>
