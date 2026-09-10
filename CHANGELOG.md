# Changelog

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.0.0 (2026-09-10)

### ⚠ BREAKING CHANGES

* **config:** extendConfig() is replaced by a default-exported config
object, consumed via defineConfig({ extends: baseConfig, ... }) as documented
at https://vitepress.dev/guide/custom-theme#distributing-a-custom-theme. The
banner anti-flash script now injects through the transformHead build hook
instead of a config mutation.

### refactor

* **config:** switch /config to extends per VitePress docs ([c15d573](https://github.com/front-factory/vitepress-theme/commit/c15d57332bbaf697b7768991494fefb7c9025137))

### Features

* **doc:** set the standfirst at body size ([7ca7021](https://github.com/front-factory/vitepress-theme/commit/7ca7021ec8d5e4b512ddbbd973b8c14bb9368b50))
* editorial vitepress theme ([b9c087f](https://github.com/front-factory/vitepress-theme/commit/b9c087f5fa5182e312ee7529f65123290185873f))
* **home:** give the hero a second column and a colophon ([1394bee](https://github.com/front-factory/vitepress-theme/commit/1394bee297b51bff6fd54693728a6c4f34c63494))
* **home:** set the hero in uppercase mono ([c647fd5](https://github.com/front-factory/vitepress-theme/commit/c647fd501096137dd4f653d56fd681649e7a923b))
* **i18n:** move the theme's own strings into themeConfig.ff.labels ([51fcbda](https://github.com/front-factory/vitepress-theme/commit/51fcbdaa7ab23e740db8a984f189a25287a53877))
* **layout:** one content band for every page ([f2b295d](https://github.com/front-factory/vitepress-theme/commit/f2b295dcdc2a9c167db13bcfb262362e51e75a9a))
* **motion:** add light and movement ([420d6cf](https://github.com/front-factory/vitepress-theme/commit/420d6cfdc74bdf109b109b2c7a6b352c4ddef824))
* **sidebar:** drop the group headings to the label size ([fa07db1](https://github.com/front-factory/vitepress-theme/commit/fa07db1977406b0500c0e2d60e6faf9ccaa255a4))
* **sidebar:** give the navigation room to read ([11c3d34](https://github.com/front-factory/vitepress-theme/commit/11c3d3433ceb76b3765696225f8bbee215357e22))
* **sidebar:** tighten the navigation column ([76f1e2b](https://github.com/front-factory/vitepress-theme/commit/76f1e2b48cc219ecb3ea98cf329fdc8afa7d454a))
* **type:** bring the headline sizes down a step ([82da285](https://github.com/front-factory/vitepress-theme/commit/82da285615e8a6e61e06aed013f65cf90084a450))
* **type:** take the page title down another step ([201f95a](https://github.com/front-factory/vitepress-theme/commit/201f95a4dc8426ca3b29090dfe47f017ead7304b))

### Bug Fixes

* **doc:** align the heading anchors with their headings ([1b14a83](https://github.com/front-factory/vitepress-theme/commit/1b14a83b0ac3ad424e3d710c8ef536304bfbbbb3))
* settle hover, the hero offsets and the banner ([223f2df](https://github.com/front-factory/vitepress-theme/commit/223f2df4a5156d28c87168d1320ff68be48883a0))
