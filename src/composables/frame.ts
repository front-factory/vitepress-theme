import {
    onMounted, toValue, watchEffect, type MaybeRefOrGetter
} from 'vue';

/**
 * Runs `update` once, then at most once per frame however many of the window `events` fire. Listens
 * only while `enabled` is true and follows it if it changes; everything is undone on unmount.
 */
export function useFrameListener(
    enabled: MaybeRefOrGetter<boolean>,
    update: () => void,
    events: string[]
) {
    let frame = 0;

    function onEvent() {
        if (!frame) {
            frame = requestAnimationFrame(() => {
                frame = 0;
                update();
            });
        }
    }

    // The effect is stopped with the component, which runs its cleanup.
    onMounted(() => {
        watchEffect((onCleanup) => {
            if (!toValue(enabled)) {
                return;
            }

            update();

            for (const name of events) {
                window.addEventListener(name, onEvent, {
                    passive: true
                });
            }

            onCleanup(() => {
                cancelAnimationFrame(frame);
                frame = 0;

                for (const name of events) {
                    window.removeEventListener(name, onEvent);
                }
            });
        });
    });
}
