<script setup lang="ts">
import { Comment, computed, Fragment, ref, Text, useSlots, type VNode } from 'vue'
import { useData } from 'vitepress'
import { VPImage } from '../internal'
import { format, useLabels } from '../composables/options'
import type { HeroExtras, HeroMetaItem } from '../types'
import type { DefaultTheme } from 'vitepress/theme'

export interface HeroAction {
    theme?: 'brand' | 'alt'
    text: string
    link: string
    target?: string
    rel?: string
}

const props = defineProps<{
    name?: string
    text?: string
    tagline?: string
    image?: DefaultTheme.ThemeableImage
    actions?: HeroAction[]
}>()

const { frontmatter } = useData()
const labels = useLabels()
const slots = useSlots()

// Two additions to the standard home frontmatter, both optional:
//
//   hero.command   the install line, printed in a panel beside the headline
//   hero.meta      a colophon strip under the hero: [{ label, value }, …]
const hero = computed<HeroExtras>(() => frontmatter.value.hero ?? {})
const command = computed<string | undefined>(() => hero.value.command)
const meta = computed<HeroMetaItem[]>(() => hero.value.meta ?? [])

/**
 * The home layout always declares the `home-hero-image` slot, so its presence says nothing about
 * whether the site filled it. Rendering it and looking at what comes back does — an unfilled slot
 * yields nothing but empty fragments and comment placeholders.
 */
function filled(nodes?: VNode[]): boolean {
    return !!nodes?.some((node) => {
        if (node.type === Comment) return false
        if (node.type === Text) return String(node.children).trim() !== ''
        if (node.type === Fragment) {
            return Array.isArray(node.children) && filled(node.children as VNode[])
        }

        return true
    })
}

// Called from the template rather than cached in a computed: the slot has to be rendered where its
// dependencies are tracked, and it changes with the page.
function hasImage() {
    return !!props.image || filled(slots['home-hero-image']?.())
}

// The second column carries the image when there is one, and the starting point otherwise. The
// actions only move over there when they have a panel to sit in.
function hasPanel() {
    return !hasImage() && !!command.value
}

// An image claims the second column, so the install panel has nowhere to sit beside the text —
// it drops under it instead rather than disappearing.
function hasInlineCommand() {
    return hasImage() && !!command.value
}

const copied = ref(false)

async function copy() {
    if (!command.value) return

    await navigator.clipboard.writeText(command.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
    <div
        class="VPHero ff-hero"
        :class="{ 'has-image': hasImage(), 'has-panel': hasPanel() }"
    >
        <span class="ff-hero-glow" aria-hidden="true" />
        <span class="ff-hero-glow ff-hero-glow-far" aria-hidden="true" />

        <div class="ff-hero-container">
            <div class="ff-hero-main">
                <slot name="home-hero-info-before" />

                <slot name="home-hero-info">
                    <p v-if="name" class="ff-hero-kicker ff-label" v-html="name" />

                    <h1 v-if="text" class="ff-hero-title ff-display" v-html="text" />

                    <p v-if="tagline" class="ff-hero-tagline" v-html="tagline" />
                </slot>

                <slot name="home-hero-info-after" />

                <div v-if="actions?.length && !hasPanel()" class="ff-hero-actions">
                    <slot name="home-hero-actions-before-actions" />

                    <a
                        v-for="action in actions"
                        :key="action.link"
                        class="ff-btn"
                        :class="`ff-btn-${action.theme ?? 'brand'}`"
                        :href="action.link"
                        :target="action.target"
                        :rel="action.rel"
                    >
                        {{ action.text }}
                    </a>
                </div>

                <slot name="home-hero-actions-after" />

                <div v-if="hasInlineCommand()" class="ff-hero-panel ff-hero-panel-inline">
                    <p class="ff-hero-panel-label ff-label">{{ labels.heroInstall }}</p>

                    <div class="ff-hero-command">
                        <code>
                            <span class="ff-hero-prompt" aria-hidden="true">$</span>
                            {{ command }}
                        </code>

                        <button
                            type="button"
                            class="ff-hero-copy ff-label"
                            :aria-label="format(labels.heroCopyLabel, command ?? '')"
                            @click="copy"
                        >
                            {{ copied ? labels.heroCopied : labels.heroCopy }}
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="hasImage()" class="ff-hero-image">
                <slot name="home-hero-image">
                    <VPImage v-if="image" class="ff-hero-image-src" :image="image" />
                </slot>
            </div>

            <aside v-else-if="hasPanel()" class="ff-hero-panel">
                <p class="ff-hero-panel-label ff-label">{{ labels.heroInstall }}</p>

                <div class="ff-hero-command">
                    <code>
                        <span class="ff-hero-prompt" aria-hidden="true">$</span>
                        {{ command }}
                    </code>

                    <button
                        type="button"
                        class="ff-hero-copy ff-label"
                        :aria-label="format(labels.heroCopyLabel, command ?? '')"
                        @click="copy"
                    >
                        {{ copied ? labels.heroCopied : labels.heroCopy }}
                    </button>
                </div>

                <div v-if="actions?.length" class="ff-hero-actions">
                    <slot name="home-hero-actions-before-actions" />

                    <a
                        v-for="action in actions"
                        :key="action.link"
                        class="ff-btn"
                        :class="`ff-btn-${action.theme ?? 'brand'}`"
                        :href="action.link"
                        :target="action.target"
                        :rel="action.rel"
                    >
                        {{ action.text }}
                    </a>
                </div>
            </aside>
        </div>

        <dl v-if="meta.length" class="ff-hero-meta">
            <div v-for="item in meta" :key="item.label" class="ff-hero-meta-item">
                <dt class="ff-label">{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
            </div>
        </dl>
    </div>
</template>
