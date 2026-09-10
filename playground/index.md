---
layout: home

hero:
  name: by Front Factory
  text: Documentation that reads like print.
  tagline: An editorial VitePress theme — hairline rules, numbered sections and monospaced metadata. One accent token to make it yours.
  command: npm install @frontfactory/vitepress-theme
  image:
    src: /hero-demo.svg
    alt: Empty slot for a product screenshot or gif
  meta:
    - label: Licence
      value: MIT
    - label: Version
      value: 0.0.0 # overridden at build time from package.json, see .vitepress/config.ts
    - label: Built on
      value: VitePress 2
    - label: Tokens
      value: 60+
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Components
      link: /guide/components

features:
  - title: One token to rebrand
    details: Every colour, size and rule width is a --ff-* custom property. Swap the accent and the whole site follows.
    linkText: Configuration
    link: /guide/configuration
  - title: Built on the default theme
    details: Search, i18n, mobile navigation and every markdown feature keep working. Upgrades stay cheap.
  - title: Numbered by the stylesheet
    details: Sidebar sections, feature cells and steps count themselves with CSS counters. No config, no markup.
  - title: Written with Magnesium
    details: Tokens are declared in Sass and emitted as custom properties, then shipped compiled — no build step downstream.
---
