<script setup lang="ts">
import {
    Fragment, onBeforeUpdate, useId, useSlots, type VNode
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
function collect(nodes: VNode[]): VNode[] {
    return nodes.flatMap((node) => {
        if (node.type === Fragment && Array.isArray(node.children)) {
            return collect(node.children as VNode[]);
        }

        return node.type === Tab ? [
            node
        ] : [];
    });
}

// Render-only cache: the template reads the tabs twice (labels, then panels), and both come from
// one slot call. It is dropped before each re-render so a changed slot is picked up. `useTabs` does
// not use it: its computed and watch call the slot themselves, which is what tracks the slot's
// reactive reads and re-evaluates them when the content changes.
let cached: VNode[] | null = null;

onBeforeUpdate(() => {
    cached = null;
});

function labelsOf(nodes: VNode[]) {
    return nodes.map((node) => String(node.props?.label ?? ''));
}

function panels(): VNode[] {
    return cached ??= collect(slots.default?.() ?? []);
}

function labels() {
    return labelsOf(panels());
}

const { active, select, onKeydown } = useTabs(
    () => labelsOf(collect(slots.default?.() ?? [])),
    () => props.syncKey
);
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
        :key="index"
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
