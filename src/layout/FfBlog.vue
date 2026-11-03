<script setup lang="ts">
import { useData, withBase } from 'vitepress';
import { data as posts } from '../blog/posts.data';
import {
    formatDate, resolveAuthor, useBlog 
} from '../composables/blog';
import { format, useLabels } from '../composables/options';

const { frontmatter, lang } = useData();
const { authors } = useBlog();
const labels = useLabels();
</script>

<template>
  <div class="ff-blog">
    <h1 class="ff-blog-title">
      {{ frontmatter.title }}
    </h1>

    <p
      v-if="frontmatter.description"
      class="ff-blog-lede"
    >
      {{ frontmatter.description }}
    </p>

    <ol class="ff-blog-list">
      <li
        v-for="post in posts"
        :key="post.url"
        class="ff-blog-post"
      >
        <div class="ff-blog-meta ff-label">
          <time :datetime="post.date">{{ formatDate(post.date, lang) }}</time>
          <span v-if="post.author">{{ format(labels.blogBy, resolveAuthor(authors, post.author)!.name) }}</span>
          <span
            v-for="tag in post.tags"
            :key="tag"
          >{{ tag }}</span>
        </div>

        <h2 class="ff-blog-post-title">
          <a :href="withBase(post.url)">{{ post.title }}</a>
        </h2>

        <p
          v-if="post.excerpt"
          class="ff-blog-excerpt"
        >
          {{ post.excerpt }}
        </p>
      </li>
    </ol>

    <p
      v-if="!posts.length"
      class="ff-blog-empty ff-label"
    >
      {{ labels.blogEmpty }}
    </p>
  </div>
</template>
