import type { InjectionKey, Ref } from 'vue';

/** Heading level `<Timeline>` hands down to its `<TimelineItem>` titles. */
export const TIMELINE_LEVEL: InjectionKey<Ref<number>> = Symbol('ff-timeline-level');
