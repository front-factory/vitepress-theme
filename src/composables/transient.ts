import { onUnmounted, ref } from 'vue';

/** A flag that turns itself off `ms` milliseconds after `start()`; the timer dies with the component. */
export function useTransientFlag(ms = 2000) {
    const active = ref(false);
    let timer: ReturnType<typeof setTimeout> | undefined;

    function stop() {
        clearTimeout(timer);
        active.value = false;
    }

    function start() {
        active.value = true;

        clearTimeout(timer);
        timer = setTimeout(() => (active.value = false), ms);
    }

    onUnmounted(() => clearTimeout(timer));

    return {
        active,
        start,
        stop
    };
}
