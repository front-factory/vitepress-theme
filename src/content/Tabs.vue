<script setup lang="ts">
import {
    Fragment, useId, useSlots, type VNode
} from 'vue';
import Tab from './Tab.vue';
import { useTabs } from '../composables/tabs';

const props = defineProps<{
    /** Groups sharing a key switch together, and the choice is remembered across visits. */
    syncKey?: string
}>();

const slots = useSlots();
const id = useId();

// The tabs are read off the slot rather than registered by each <Tab> on setup: during SSR the
// list is printed before any child runs, so a registration would come too late.
function panels(nodes: VNode[] = slots.default?.() ?? []): VNode[] {
    return nodes.flatMap((node) => {
        if (node.type === Fragment && Array.isArray(node.children)) {
            return panels(node.children as VNode[]);
        }

        return node.type === Tab ? [
            node
        ] : [];
    });
}

function labels() {
    return panels().map((node) => String(node.props?.label ?? ''));
}

const { active, select, onKeydown } = useTabs(labels, () => props.syncKey);
</script>

<template>
  <div class="ff-tabs">
    <div
      class="ff-tabs-list"
      role="tablist"
      @keydown="onKeydown"
    >
      <button
        v-for="(label, index) in labels()"
        :id="`${id}-tab-${index}`"
        :key="label"
        type="button"
        role="tab"
        class="ff-tabs-tab"
        :class="{ active: index === active }"
        :aria-selected="index === active"
        :aria-controls="`${id}-panel-${index}`"
        :tabindex="index === active ? 0 : -1"
        @click="select(index)"
      >
        {{ label }}
      </button>
    </div>

    <div
      v-for="(panel, index) in panels()"
      v-show="index === active"
      :id="`${id}-panel-${index}`"
      :key="index"
      class="ff-tabs-panel"
      role="tabpanel"
      :aria-labelledby="`${id}-tab-${index}`"
      tabindex="0"
    >
      <component :is="panel" />
    </div>
  </div>
</template>
