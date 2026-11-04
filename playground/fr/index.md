---
layout: home

hero:
  name: par Front Factory
  text: Une documentation qui se lit comme un imprimé.
  tagline: Un thème VitePress éditorial — filets fins, sections numérotées et métadonnées en chasse fixe. Un seul jeton d'accent pour le faire vôtre.
  command: npm install @frontfactory/vitepress-theme
  image:
    src: /hero-illustration.svg
    alt: ""
  quote: L'imagination est plus importante que le savoir. — <strong>Albert Einstein</strong>
  meta:
    - label: Licence
      value: MIT
    - label: Version
      value: 0.0.0 # overridden at build time from package.json, see .vitepress/config.ts
    - label: Basé sur
      value: VitePress 2
    - label: Jetons
      value: 60+
  actions:
    - theme: brand
      text: Commencer
      link: /fr/guide/getting-started
    - theme: alt
      text: Composants
      link: /fr/guide/components

features:
  - title: Un seul jeton pour changer d'identité
    details: Chaque couleur, taille et épaisseur de filet est une propriété personnalisée --ff-*. Changez l'accent et tout le site suit.
    linkText: Configuration
    link: /guide/configuration
  - title: Construit sur le thème par défaut
    details: La recherche, l'i18n, la navigation mobile et chaque fonctionnalité Markdown continuent de fonctionner. Les mises à jour restent peu coûteuses.
  - title: Numéroté par la feuille de style
    details: Les sections de la barre latérale, les cellules de fonctionnalités et les étapes se comptent seules avec des compteurs CSS. Aucune configuration, aucun balisage.
  - title: Écrit avec Magnesium
    details: Les jetons sont déclarés en Sass et émis en propriétés personnalisées, puis livrés compilés — aucune étape de build en aval.
---

<script setup>
import { VPHomeSponsors } from 'vitepress/theme';

const sponsors = [
  {
    tier: 'Sponsors Platine',
    items: [
      { name: 'Umbrella Corp', img: '/sponsor-umbrella.png', url: 'https://example.com' },
      { name: 'Rabbit', img: '/sponsor-rabbit.png', url: 'https://example.com' }
    ]
  },
  {
    tier: 'Sponsors Or',
    items: [
      { name: 'Acme Corp', img: '/sponsor-acme.png', url: 'https://example.com' },
      { name: 'Globex', img: '/sponsor-globex.png', url: 'https://example.com' },
      { name: 'Initech', img: '/sponsor-initech.png', url: 'https://example.com' }
    ]
  }
]
</script>

<VPHomeSponsors
  message="Merci aux personnes qui financent le développement de ce thème."
  action-text="Devenir sponsor"
  action-link="https://github.com/sponsors"
  :data="sponsors"
/>
