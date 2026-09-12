<script setup lang="ts">
import { VPSponsors } from '../internal';
import { useLabels } from '../composables/options';

export interface SponsorItem {
    name: string
    img: string
    url: string
}

export interface SponsorTier {
    tier?: string
    size?: 'xmini' | 'mini' | 'small' | 'medium' | 'big'
    items: SponsorItem[]
}

defineProps<{
    message?: string
    actionText?: string
    actionLink?: string
    data: SponsorTier[] | SponsorItem[]
}>();

const labels = useLabels();
</script>

<template>
  <section class="VPHomeSponsors ff-sponsors">
    <div class="ff-sponsors-container">
      <h2 class="ff-sponsors-title ff-display">
        {{ labels.sponsors }}
      </h2>
      <p
        v-if="message"
        class="ff-sponsors-message"
      >
        {{ message }}
      </p>

      <VPSponsors
        class="ff-sponsors-grid"
        :data="data"
      />

      <div
        v-if="actionLink"
        class="ff-sponsors-action"
      >
        <a
          class="ff-btn ff-btn-alt no-icon"
          :href="actionLink"
        >{{ actionText ?? labels.sponsorsAction }}</a>
      </div>
    </div>
  </section>
</template>
