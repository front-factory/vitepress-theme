import { toValue, type MaybeRefOrGetter } from 'vue';
import { useTransientFlag } from './transient';

/** Copies a string to the clipboard and flags it as copied for two seconds. */
export function useCopy(text: MaybeRefOrGetter<string>) {
    const { active: copied, start } = useTransientFlag();

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

        start();
    }

    return {
        copied,
        copy
    };
}
