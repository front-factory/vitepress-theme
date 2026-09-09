<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { useData } from 'vitepress'
import { VPImage } from '../internal'
import type { DefaultTheme } from 'vitepress/theme'

export interface HeroAction {
    theme?: 'brand' | 'alt'
    text: string
    link: string
    target?: string
    rel?: string
}

defineProps<{
    name?: string
    text?: string
    tagline?: string
    image?: DefaultTheme.ThemeableImage
    actions?: HeroAction[]
}>()

const slots = useSlots()
const { frontmatter } = useData()

// Optional extra: `hero.command` in the frontmatter prints the install line under the actions.
const command = computed<string | undefined>(() => frontmatter.value.hero?.command)

const copied = ref(false)

async function copy() {
    if (!command.value) return

    await navigator.clipboard.writeText(command.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
    <div class="VPHero ff-hero" :class="{ 'has-image': image || slots['home-hero-image'] }">
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

                <slot name="home-hero-actions-after" />

                <div v-if="command" class="ff-hero-command">
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
            </div>

            <div v-if="image || slots['home-hero-image']" class="ff-hero-image">
                <slot name="home-hero-image">
                    <VPImage v-if="image" class="ff-hero-image-src" :image="image" />
                </slot>
            </div>
        </div>
    </div>
</template>
