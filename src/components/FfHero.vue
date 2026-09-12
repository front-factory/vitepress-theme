<script setup lang="ts">
import {
    Comment, computed, Fragment, Text, useSlots, type VNode 
} from 'vue';
import { useData } from 'vitepress';
import { VPImage } from '../internal';
import FfHeroCommand from './FfHeroCommand.vue';
import type { HeroExtras, HeroMetaItem } from '../types';
import type { DefaultTheme } from 'vitepress/theme';

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
}>();

const { frontmatter } = useData();
const slots = useSlots();

// Three additions to the standard home frontmatter, all optional:
//
//   hero.command   the install line, printed in a panel beside the headline
//   hero.quote     a short line ruled like a markdown blockquote — under the tagline normally, or
//                  under the install line instead once one sits inline beneath it (see hasInlineCommand)
//   hero.meta      a colophon strip under the hero: [{ label, value }, …]
const hero = computed<HeroExtras>(() => frontmatter.value.hero ?? {});
const command = computed<HeroExtras['command']>(() => hero.value.command);
const hasCommand = computed(() => (Array.isArray(command.value) ? command.value.length > 0 : !!command.value));
const hasActions = computed(() => !!props.actions?.length);
const quote = computed<string | undefined>(() => hero.value.quote);
const meta = computed<HeroMetaItem[]>(() => hero.value.meta ?? []);

/**
 * The home layout always declares the `home-hero-image` slot, so its presence says nothing about
 * whether the site filled it. Rendering it and looking at what comes back does — an unfilled slot
 * yields nothing but empty fragments and comment placeholders.
 */
function filled(nodes?: VNode[]): boolean {
    return !!nodes?.some((node) => {
        if (node.type === Comment) {
            return false;
        }

        if (node.type === Text) {
            return String(node.children).trim() !== '';
        }

        if (node.type === Fragment) {
            return Array.isArray(node.children) && filled(node.children as VNode[]);
        }

        return true;
    });
}

// Called from the template rather than cached in a computed: the slot has to be rendered where its
// dependencies are tracked, and it changes with the page.
function hasImage() {
    return !!props.image || filled(slots['home-hero-image']?.());
}

// The second column carries the image when there is one, and the starting point otherwise. The
// actions only move over there when they have a panel to sit in.
function hasPanel() {
    return !hasImage() && hasCommand.value;
}

// An image claims the second column, so the install panel has nowhere to sit beside the text —
// it drops under it instead rather than disappearing.
function hasInlineCommand() {
    return hasImage() && hasCommand.value;
}
</script>

<template>
  <div
    class="VPHero ff-hero"
    :class="{ 'has-image': hasImage(), 'has-panel': hasPanel() }"
  >
    <span
      class="ff-hero-glow"
      aria-hidden="true"
    />
    <span
      class="ff-hero-glow ff-hero-glow-far"
      aria-hidden="true"
    />

    <div class="ff-hero-container">
      <div class="ff-hero-main">
        <slot name="home-hero-info-before" />

        <slot name="home-hero-info">
          <p
            v-if="name"
            class="ff-hero-kicker ff-label"
            v-html="name"
          />

          <h1
            v-if="text"
            class="ff-hero-title ff-display"
            v-html="text"
          />

          <p
            v-if="tagline"
            class="ff-hero-tagline"
            v-html="tagline"
          />

          <blockquote
            v-if="quote && !hasInlineCommand()"
            class="ff-hero-quote"
            v-html="quote"
          />
        </slot>

        <slot name="home-hero-info-after" />

        <div
          v-if="hasActions && !hasPanel()"
          class="ff-hero-actions"
        >
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

        <FfHeroCommand
          v-if="hasInlineCommand()"
          :command="command!"
          bare
          class="ff-hero-panel ff-hero-panel-inline ff-hero-panel-bare"
        />

        <blockquote
          v-if="quote && hasInlineCommand()"
          class="ff-hero-quote"
          v-html="quote"
        />
      </div>

      <div
        v-if="hasImage()"
        class="ff-hero-image"
      >
        <slot name="home-hero-image">
          <VPImage
            v-if="image"
            class="ff-hero-image-src"
            :image="image"
          />
        </slot>
      </div>

      <aside
        v-else-if="hasPanel()"
        class="ff-hero-panel"
        :class="{ 'ff-hero-panel-bare': !hasActions }"
      >
        <FfHeroCommand
          :command="command!"
          :bare="!hasActions"
        />

        <div
          v-if="hasActions"
          class="ff-hero-actions"
        >
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

    <dl
      v-if="meta.length"
      class="ff-hero-meta"
    >
      <div
        v-for="item in meta"
        :key="item.label"
        class="ff-hero-meta-item"
      >
        <dt class="ff-label">
          {{ item.label }}
        </dt>
        <dd>{{ item.value }}</dd>
      </div>
    </dl>
  </div>
</template>
