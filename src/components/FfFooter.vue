<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useLayout, VPIcon, VPLink } from '../internal'
import { useLabels, useThemeOptions } from '../composables/options'
import type { DefaultTheme } from '../types'

const { theme, frontmatter } = useData()
const { hasSidebar } = useLayout()
const options = useThemeOptions()
const labels = useLabels()

const columns = computed(() => options.value.footerColumns ?? [])

/**
 * `themeConfig.socialLinks`, printed as a normal footer column: one row per network, its logo
 * beside a readable name. The name is the entry's `ariaLabel`, or the icon slug it defaults to.
 */
const social = computed(() => {
    if (options.value.footerSocial === false) return []

    return ((theme.value.socialLinks ?? []) as DefaultTheme.SocialLink[]).map((link) => ({
        ...link,
        icon:
            typeof link.icon === 'string' && !link.icon.includes(':')
                ? `simple-icons:${link.icon}`
                : link.icon,
        text: link.ariaLabel ?? (typeof link.icon === 'string' ? link.icon : '')
    }))
})

const visible = computed(
    () =>
        (theme.value.footer || columns.value.length || social.value.length) &&
        frontmatter.value.footer !== false
)
</script>

<template>
    <footer v-if="visible" class="VPFooter ff-footer" :class="{ 'has-sidebar': hasSidebar }">
        <div class="ff-footer-container">
            <div v-if="columns.length || social.length" class="ff-footer-top">
                <div v-if="columns.length" class="ff-footer-columns">
                    <div v-for="column in columns" :key="column.title" class="ff-footer-column">
                        <p class="ff-label">{{ column.title }}</p>

                        <ul>
                            <li v-for="item in column.items" :key="item.link">
                                <VPLink :href="item.link" :rel="item.rel" :target="item.target">
                                    {{ item.text }}
                                </VPLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div v-if="social.length" class="ff-footer-column ff-footer-social">
                    <p class="ff-label">{{ labels.footerSocial }}</p>

                    <ul>
                        <li v-for="item in social" :key="item.link">
                            <a
                                :href="item.link"
                                :target="item.target ?? '_blank'"
                                rel="me noopener"
                            >
                                <VPIcon :icon="item.icon" />
                                <span>{{ item.text }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="theme.footer" class="ff-footer-legal">
                <p v-if="theme.footer.message" class="message" v-html="theme.footer.message" />
                <p v-if="theme.footer.copyright" class="copyright" v-html="theme.footer.copyright" />
            </div>
        </div>
    </footer>
</template>
