<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import {
    formatDate, resolveAuthor, useBlog 
} from '../composables/blog';
import { format, useLabels } from '../composables/options';

const { frontmatter, lang } = useData();
const { isPost, authors } = useBlog();
const labels = useLabels();

const date = computed(() => (isPost.value ? new Date(frontmatter.value.date).toISOString() : ''));
const author = computed(() => resolveAuthor(authors.value, frontmatter.value.author));
const tags = computed<string[]>(() => (Array.isArray(frontmatter.value.tags) ? frontmatter.value.tags : []));
</script>

<template>
  <div
    v-if="isPost"
    class="ff-post ff-label"
  >
    <time
      class="ff-post-item"
      :datetime="date"
    >{{ formatDate(date, lang) }}</time>
    <span
      v-if="author"
      class="ff-post-item ff-post-author"
    >
      <img
        v-if="author.avatar"
        :src="author.avatar"
        alt=""
        class="ff-post-avatar"
      >
      <a
        v-if="author.link"
        :href="author.link"
      >{{ format(labels.blogBy, author.name) }}</a>
      <template v-else>{{ format(labels.blogBy, author.name) }}</template>
    </span>
    <span
      v-for="tag in tags"
      :key="tag"
      class="ff-post-item ff-post-tag"
    >{{ tag }}</span>
  </div>
</template>
