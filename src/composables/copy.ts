import {
    onUnmounted, ref, toValue, type MaybeRefOrGetter
} from 'vue';

/** Copies a string to the clipboard and flags it as copied for two seconds. */
export function useCopy(text: MaybeRefOrGetter<string>) {
    const copied = ref(false);
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function copy() {
        const value = toValue(text);

        if (!value) {
            return;
        }

        try {
            await navigator.clipboard.writeText(value);
        } catch {
            // Insecure context or denied permission: there is nothing to confirm.
            return;
        }

        copied.value = true;

        clearTimeout(timer);
        timer = setTimeout(() => (copied.value = false), 2000);
    }

    onUnmounted(() => clearTimeout(timer));

    return {
        copied,
        copy
    };
}
