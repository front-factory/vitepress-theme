---
layout: page
title: Équipe
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
    title: 'Mainteneuse',
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
    <template #title>Équipe</template>
    <template #lead>Composants d'équipe natifs de VitePress, laissés tels quels par ce thème.</template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #title>Mainteneurs</template>
    <template #members>
      <VPTeamMembers :members="members" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
