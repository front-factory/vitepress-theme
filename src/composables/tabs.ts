import {
    computed, onMounted, onUnmounted, reactive, ref, toValue, watch, type MaybeRefOrGetter
} from 'vue';

const STORAGE_PREFIX = 'ff-tabs:';

// Label picked for each sync key. Module-level so every tab group on the page reads the same
// value; the `storage` event only fires in *other* documents, which is what keeps tabs open
// side by side in agreement.
const synced = reactive<Record<string, string>>({});
let listening = false;

function listen() {
    if (listening) {
        return;
    }

    listening = true;

    window.addEventListener('storage', (event) => {
        if (event.key?.startsWith(STORAGE_PREFIX) && event.newValue !== null) {
            synced[event.key.slice(STORAGE_PREFIX.length)] = event.newValue;
        }
    });
}

/**
 * Active tab of a group of labels. With a sync key, the choice is shared by label with every
 * group using the same key and remembered across visits.
 */
export function useTabs(labels: MaybeRefOrGetter<string[]>, syncKey?: MaybeRefOrGetter<string | undefined>) {
    const local = ref(0);

    // Client-side navigation can swap the labels without remounting the component (two pages
    // using the same layout), so the index is reset rather than left pointing past the end.
    watch(() => toValue(labels), () => (local.value = 0));

    const active = computed(() => {
        const list = toValue(labels);
        const key = toValue(syncKey);

        if (key && synced[key] !== undefined) {
            const index = list.indexOf(synced[key]);

            if (index !== -1) {
                return index;
            }
        }

        return Math.min(local.value, Math.max(list.length - 1, 0));
    });

    function select(index: number) {
        local.value = index;

        const key = toValue(syncKey);
        const label = toValue(labels)[index];

        if (!key || label === undefined) {
            return;
        }

        synced[key] = label;

        try {
            localStorage.setItem(STORAGE_PREFIX + key, label);
        } catch {
            // Storage disabled: the choice still holds for this page.
        }
    }

    // Read after mount only, so the server and the hydrating client both render the first tab.
    onMounted(() => {
        const key = toValue(syncKey);

        if (!key) {
            return;
        }

        listen();

        try {
            const stored = localStorage.getItem(STORAGE_PREFIX + key);

            if (stored !== null && synced[key] === undefined) {
                synced[key] = stored;
            }
        } catch {
            // Storage disabled: fall back to the first tab.
        }
    });

    return {
        active,
        select
    };
}

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
