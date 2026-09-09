<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useLayout, VPLink } from '../internal'
import { useThemeOptions } from '../composables/options'

const { theme, frontmatter } = useData()
const { hasSidebar } = useLayout()
const options = useThemeOptions()

const columns = computed(() => options.value.footerColumns ?? [])
const visible = computed(
    () => (theme.value.footer || columns.value.length) && frontmatter.value.footer !== false
)
</script>

<template>
    <footer v-if="visible" class="VPFooter ff-footer" :class="{ 'has-sidebar': hasSidebar }">
        <div class="ff-footer-container">
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

            <div v-if="theme.footer" class="ff-footer-legal">
                <p v-if="theme.footer.message" class="message" v-html="theme.footer.message" />
                <p v-if="theme.footer.copyright" class="copyright" v-html="theme.footer.copyright" />
            </div>
        </div>
    </footer>
</template>
