---
layout: page
title: Team
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: '/team-ada.svg',
    name: 'Ada Lin',
    title: 'Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com' },
      { icon: 'bluesky', link: 'https://bsky.app' }
    ]
  },
  {
    avatar: '/team-grace.svg',
    name: 'Grace Okafor',
    title: 'Design',
    links: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Team</template>
    <template #lead>Native VitePress team components, unstyled by this theme.</template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #title>Maintainers</template>
    <template #members>
      <VPTeamMembers :members="members" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
