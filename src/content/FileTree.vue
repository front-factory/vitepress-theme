<script lang="ts">
import {
    Comment, Fragment, Text, createTextVNode, defineComponent, h, isVNode, type VNode
} from 'vue';

interface Entry {
    label: Array<string | VNode>
    children: Entry[]
    folder: boolean
}

// Markdown renders a list as plain <ul>/<li> vnodes, and whitespace between them as text; the
// fragments and blanks are skipped so only real elements remain.
function elements(nodes: unknown): VNode[] {
    const list = Array.isArray(nodes) ? nodes : [
        nodes
    ];

    return list.flatMap((node) => {
        if (!isVNode(node) || node.type === Comment) {
            return [];
        }

        return node.type === Fragment ? elements(node.children) : [
            node
        ];
    });
}

function textOf(part: string | VNode): string {
    if (typeof part === 'string') {
        return part;
    }

    if (typeof part.children === 'string') {
        return part.children;
    }

    return Array.isArray(part.children) ? part.children.map((child) => textOf(child as string | VNode)).join('') : '';
}

// The slash only marks a folder in the source; it is dropped from what is displayed.
function stripSlash(part: string | VNode): string | VNode {
    if (typeof part === 'string') {
        return part.replace(/\/\s*$/, '');
    }

    if (part.type === Text && typeof part.children === 'string') {
        return createTextVNode(part.children.replace(/\/\s*$/, ''));
    }

    if (typeof part.children === 'string') {
        return h(part.type as string, part.props, part.children.replace(/\/\s*$/, ''));
    }

    if (Array.isArray(part.children)) {
        const children = part.children as Array<string | VNode>;

        return h(part.type as string, part.props, [
            ...children.slice(0, -1),
            stripSlash(children[children.length - 1])
        ]);
    }

    return part;
}

function entries(list: VNode): Entry[] {
    return elements(list.children).filter((node) => node.type === 'li').map((item) => {
        const parts = typeof item.children === 'string' ? [
            item.children
        ] : (item.children as unknown[] ?? []).flatMap((child) => (Array.isArray(child) ? child : [
            child
        ]));
        const nested = parts.find((part): part is VNode => isVNode(part) && part.type === 'ul');
        const label = parts.filter((part): part is string | VNode => part !== nested && (typeof part === 'string' || isVNode(part)) && textOf(part).trim() !== '');
        const children = nested ? entries(nested) : [];
        const folder = Boolean(nested) || /\/\s*$/.test(textOf(label[label.length - 1] ?? ''));

        return {
            label: folder && label.length ? [
                ...label.slice(0, -1),
                stripSlash(label[label.length - 1])
            ] : label,
            children,
            folder
        };
    });
}

function render(items: Entry[]): VNode {
    return h('ul', items.map((entry) => h('li', {
        class: entry.folder ? 'is-folder' : 'is-file'
    }, [
        h('span', {
            class: 'ff-filetree-name' 
        }, entry.label),
        entry.children.length ? render(entry.children) : null
    ])));
}

export default defineComponent({
    name: 'FileTree',
    setup(_, { slots }) {
        // The tree is read off the slot on each render rather than parsed into state, so it follows
        // hot updates of the Markdown it sits in.
        return () => {
            const list = elements(slots.default?.()).find((node) => node.type === 'ul');

            return h('div', {
                class: 'ff-filetree' 
            }, list ? [
                render(entries(list))
            ] : []);
        };
    }
});
</script>
