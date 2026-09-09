<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { useData } from 'vitepress'
import { layoutInfoInjectionKey, VPImage } from '../internal'
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

// The layout always declares the home-hero-image slot, so whether the site actually filled it is
// only knowable through the flag the home layout provides.
const { heroImageSlotExists } = inject(layoutInfoInjectionKey, {
    heroImageSlotExists: computed(() => false)
})

// Two additions to the standard home frontmatter, both optional:
//
//   hero.command   the install line, printed in a panel beside the headline
//   hero.meta      a colophon strip under the hero: [{ label, value }, …]
const command = computed<string | undefined>(() => frontmatter.value.hero?.command)
const meta = computed<{ label: string; value: string }[]>(
    () => frontmatter.value.hero?.meta ?? []
)

const hasImage = computed(() => !!props.image || heroImageSlotExists.value)

// The second column carries the image when there is one, and the starting point otherwise. The
// actions only move over there when they have a panel to sit in.
const hasPanel = computed(() => !hasImage.value && !!command.value)
const asideActions = computed(() => (hasPanel.value ? props.actions : undefined))
const mainActions = computed(() => (hasPanel.value ? undefined : props.actions))

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
        :class="{ 'has-image': hasImage, 'has-panel': hasPanel }"
    >
        <span class="ff-hero-glow" aria-hidden="true" />
        <span class="ff-hero-glow ff-hero-glow-far" aria-hidden="true" />

        <div class="ff-hero-container">
            <div class="ff-hero-main">
                <slot name="home-hero-info-before" />

                <slot name="home-hero-info">
                    <p v-if="name" class="ff-hero-kicker ff-label">
                        <span class="ff-hero-mark" aria-hidden="true" />
                        <span v-html="name" />
                    </p>

                    <h1 v-if="text" class="ff-hero-title ff-display" v-html="text" />

                    <p v-if="tagline" class="ff-hero-tagline" v-html="tagline" />
                </slot>

                <slot name="home-hero-info-after" />

                <div v-if="mainActions?.length" class="ff-hero-actions">
                    <slot name="home-hero-actions-before-actions" />

                    <a
                        v-for="action in mainActions"
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
            </div>

            <div v-if="hasImage" class="ff-hero-image">
                <slot name="home-hero-image">
                    <VPImage v-if="image" class="ff-hero-image-src" :image="image" />
                </slot>
            </div>

            <aside v-else-if="hasPanel" class="ff-hero-panel">
                <p class="ff-hero-panel-label ff-label">Install</p>

                <div class="ff-hero-command">
                    <code>
                        <span class="ff-hero-prompt" aria-hidden="true">$</span>
                        {{ command }}
                    </code>

                    <button
                        type="button"
                        class="ff-hero-copy ff-label"
                        :aria-label="`Copy ${command}`"
                        @click="copy"
                    >
                        {{ copied ? 'Copied' : 'Copy' }}
                    </button>
                </div>

                <div v-if="asideActions?.length" class="ff-hero-actions">
                    <slot name="home-hero-actions-before-actions" />

                    <a
                        v-for="action in asideActions"
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
