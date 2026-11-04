# Changelog

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.8.0](https://github.com/front-factory/vitepress-theme/compare/v1.7.0...v1.8.0) (2026-11-04)

### Features

* **blog:** add a blog layout with rss feed ([6025542](https://github.com/front-factory/vitepress-theme/commit/60255428b91af2591e48f597c688b9be16547b89))
* **build:** generate llms.txt ([667dbda](https://github.com/front-factory/vitepress-theme/commit/667dbdaa1e4e8685aff3cda9fe1e01b5a441f24d))
* **build:** generate open graph images ([b6c2491](https://github.com/front-factory/vitepress-theme/commit/b6c249178798df1cadda134505e009d02d25a47a))
* **content:** add a Callout component ([928e3b0](https://github.com/front-factory/vitepress-theme/commit/928e3b0400e6ee2ab21e0851211270c647f18eab))
* **content:** add a FileTree component ([00fca33](https://github.com/front-factory/vitepress-theme/commit/00fca331a234b7d038efe490a52c37496387ab3c))
* **content:** add new, beta, deprecated and since badge variants ([f252ec6](https://github.com/front-factory/vitepress-theme/commit/f252ec640c34bb3fdb361ab8925fcf873b17c397))
* **content:** add Tabs and Tab components ([ecb0aff](https://github.com/front-factory/vitepress-theme/commit/ecb0aff234c620d927832e1d93f8ed77b994dada))
* **content:** add Timeline and TimelineItem components ([0ed25c0](https://github.com/front-factory/vitepress-theme/commit/0ed25c0e8f38f5226871178f33b5c31fbe898436))
* **doc:** add a copy-as-markdown button ([5de1450](https://github.com/front-factory/vitepress-theme/commit/5de1450a835b17ac42eb71f812569cb8755d12f2))
* **doc:** add a page feedback widget ([4efd586](https://github.com/front-factory/vitepress-theme/commit/4efd5861312f3d23f4e7926cb3c3940ddf5df072))
* **i18n:** route banner CTA and API tags through theme labels ([cfff3f9](https://github.com/front-factory/vitepress-theme/commit/cfff3f9408bbd59a376e454f3ed8abaa3ab3f024))
* **layout:** add a reading progress bar ([e524519](https://github.com/front-factory/vitepress-theme/commit/e5245199deb281c0e3101569d9be7a30cb4a6d83))
* **layout:** add a wide doc layout ([2cf68f8](https://github.com/front-factory/vitepress-theme/commit/2cf68f89dbb0c7ce6b0295fddf4b5ba3a4b9b276))
* **nav:** add a version switcher ([fd26deb](https://github.com/front-factory/vitepress-theme/commit/fd26deb1d3bd56950518485d1166416bca4d328a))
* **styles:** add print styles ([2ff9899](https://github.com/front-factory/vitepress-theme/commit/2ff9899f6c88c7c337dfd06d30145a12def94a65))
* **theme:** add accent presets ([97c38cc](https://github.com/front-factory/vitepress-theme/commit/97c38cc382045b2a3c62f09b4b06f920ac203d39))
* **timeline:** add a level prop for entry headings ([82476b9](https://github.com/front-factory/vitepress-theme/commit/82476b9a94f1e92c7c638e1dc3665af0400e2e7c))
* **tokens:** add an enter duration token for the hero animation ([13d9e19](https://github.com/front-factory/vitepress-theme/commit/13d9e19875075e3734a8c725751b25dded21020d))

### Bug Fixes

* **a11y:** announce code block copies to screen readers ([83b45a3](https://github.com/front-factory/vitepress-theme/commit/83b45a38c83ecc2651b647afba56a4184829116d))
* **a11y:** expose the hero command switcher as tabs ([90bd51c](https://github.com/front-factory/vitepress-theme/commit/90bd51c25b4ae75f4d9ea749456067380cbec6ce))
* **a11y:** hand focus to the skip link when the banner is dismissed ([4c455f5](https://github.com/front-factory/vitepress-theme/commit/4c455f58de5b9247adcb1fd596899aed207254ba))
* **a11y:** include the current version in the version switcher name ([73ef48b](https://github.com/front-factory/vitepress-theme/commit/73ef48be2c306bd9086fda0ac4a01216d34956b9))
* **a11y:** link only the feature title, stretched over the card ([d55d946](https://github.com/front-factory/vitepress-theme/commit/d55d946c302273d27fc22ce2632da1dc9eff01fb))
* **a11y:** make doc link underline visible by default ([a45d78c](https://github.com/front-factory/vitepress-theme/commit/a45d78c539c0689d0962a1154ab0d96e887f900d))
* **a11y:** move focus to the thank-you line after a feedback vote ([990577b](https://github.com/front-factory/vitepress-theme/commit/990577b70d3f2a08485adbdb32a7c7ea0bb31955))
* align vite peer range with the one vitepress 2 requires ([e5da335](https://github.com/front-factory/vitepress-theme/commit/e5da3351a7106fd7ba9a0bb464be778dff192289))
* **blog:** annotate posts loader type to fix declaration build ([5a422c3](https://github.com/front-factory/vitepress-theme/commit/5a422c37002d7df04d87adc254e344109b5d7b1c))
* **code:** keep removed diff lines at full opacity for contrast ([0d1956c](https://github.com/front-factory/vitepress-theme/commit/0d1956cee66bc93e1369f8991b610ea796a26b92))
* **code:** keep the copy button fully opaque for non-text contrast ([a94e45b](https://github.com/front-factory/vitepress-theme/commit/a94e45b5b38f3482e9a09a7727e22394468542f7))
* **dark:** add shadow tokens with a dark scheme variant ([742b858](https://github.com/front-factory/vitepress-theme/commit/742b8584736088ff339cd4fdceed6bf11d3bb8ed))
* make vite a required peer dependency ([08b0df4](https://github.com/front-factory/vitepress-theme/commit/08b0df4f436b696ded556a6192874013fc426797))
* **motion:** honour reduced motion on the nav underline ([cf70693](https://github.com/front-factory/vitepress-theme/commit/cf706934a8295e1cac2b3f770b992cbf62fb6c49))
* observe banner height when it mounts after the layout ([27949c6](https://github.com/front-factory/vitepress-theme/commit/27949c6b14dda17b53a716f8dd4fd989d44a72af))
* resolve hero, banner and sponsors links against site base ([2f1ed04](https://github.com/front-factory/vitepress-theme/commit/2f1ed043c7b653e2a632cb495f362896a8886f41))
* **responsive:** align content breakpoints on 640px without overlap ([66d5e34](https://github.com/front-factory/vitepress-theme/commit/66d5e34032a9e5c4cfa061c390de0041a197f1ab))
* ship generated type declarations instead of raw sources ([6aafc8d](https://github.com/front-factory/vitepress-theme/commit/6aafc8d11184f58fd90f7fbbcb161580ca4fa127))

### Performance

* only listen to scroll and measure the page when their option is on ([9a14af7](https://github.com/front-factory/vitepress-theme/commit/9a14af7a9397572eba7478726185145e9d634716))
* render the hero image slot once per render ([684d78e](https://github.com/front-factory/vitepress-theme/commit/684d78e8e35b29c002be0ccd0ca125cbb1dca2dc))
* stop the hero glow animation while the glow is disabled ([2ea95f5](https://github.com/front-factory/vitepress-theme/commit/2ea95f556cf9966b348b3c81f780297d93b6ea8d))

### Dependencies

* **deps:** add feed as an optional peer dependency ([198d81e](https://github.com/front-factory/vitepress-theme/commit/198d81e9d44eba4c92e39b0c4f468f7c85262822))
* **deps:** add satori and resvg as optional peer dependencies ([5e8fefa](https://github.com/front-factory/vitepress-theme/commit/5e8fefa242b8b0b870e30af22294ee7f72aa840c))

## [1.7.0](https://github.com/front-factory/vitepress-theme/compare/v1.6.0...v1.7.0) (2026-10-11)

### Features

* **a11y:** support forced colours ([391e35c](https://github.com/front-factory/vitepress-theme/commit/391e35cd8fc65a7638acf5d5fddefdda003764ab))

### Bug Fixes

* **a11y:** honour reduced motion on the remaining transitions ([a3529d7](https://github.com/front-factory/vitepress-theme/commit/a3529d783851719230601b5832bb08fffd6de21e))
* **a11y:** label the hero install group and drop its aside landmark ([1d303e2](https://github.com/front-factory/vitepress-theme/commit/1d303e2dc41bc95ee44beabb205eec4c0d9681a2))
* **a11y:** name footer navs and announce links opening in a new tab ([5c18122](https://github.com/front-factory/vitepress-theme/commit/5c18122a18be72c1e25233f2d08564929ff7cb27))
* **a11y:** raise the contrast of the faint ink token ([0e5a4fe](https://github.com/front-factory/vitepress-theme/commit/0e5a4fe5b604ef05c0baa362cc6502c4b9d08981))
* **back-to-top:** throttle scroll and respect reduced motion ([8549fc5](https://github.com/front-factory/vitepress-theme/commit/8549fc523414b4347d837cb43d0b17670dd2beb6))
* **banner:** enlarge and centre the dismiss button ([f9043c6](https://github.com/front-factory/vitepress-theme/commit/f9043c642633b06cbdde0c4a298995df476bfedf))
* **banner:** survive unavailable localStorage ([4a317f2](https://github.com/front-factory/vitepress-theme/commit/4a317f27147818b14f0e7d862071937effc2fa78))
* **doc-meta:** mark the last-updated stamp up as a time element ([303459f](https://github.com/front-factory/vitepress-theme/commit/303459fcebaa1688df122300a8f3041925f086da))
* **hero:** handle clipboard failure and announce the copy ([d2a29c1](https://github.com/front-factory/vitepress-theme/commit/d2a29c1e4cd67cac04b1942e4015e8ad1d6f94b3))

## [1.6.0](https://github.com/front-factory/vitepress-theme/compare/v1.5.3...v1.6.0) (2026-09-13)

### Features

* **playground:** add a custom 404 page ([fc08f30](https://github.com/front-factory/vitepress-theme/commit/fc08f303a6713102490d29f48bf1f871722eee7d))
* **playground:** add a team page ([5098161](https://github.com/front-factory/vitepress-theme/commit/50981617a5fd108b22ccfa6cab29ac940dc32119))
* **playground:** demonstrate VPDocAsideSponsors in the doc aside ([d4af98a](https://github.com/front-factory/vitepress-theme/commit/d4af98a3a28d9b9147918b0ba32e423da94463e5))
* **playground:** reach the team page from the top nav ([b948cad](https://github.com/front-factory/vitepress-theme/commit/b948cad271c0707030b4bc7f88025645a4b44d9b))

### Bug Fixes

* **sidebar:** center a level-0 caret with the label it collapses ([bfb7dac](https://github.com/front-factory/vitepress-theme/commit/bfb7dac6e4173136333f1277cd55759940eb3fe5))
* **sidebar:** distinguish a nested group heading from a real link ([16217ae](https://github.com/front-factory/vitepress-theme/commit/16217ae8d986e1fbc2cb98658edceeb8c415caae))

## [1.5.3](https://github.com/front-factory/vitepress-theme/compare/v1.5.2...v1.5.3) (2026-09-12)

### Bug Fixes

* **config:** escape the banner id before inlining it into the head script ([a1e22a4](https://github.com/front-factory/vitepress-theme/commit/a1e22a489663fcf787838f86fa344ca3433e838e))
* **feature:** hide the decorative icon from assistive tech ([835b418](https://github.com/front-factory/vitepress-theme/commit/835b4180846097c2ae1ae7739e231595e66f37a8))
* **hero-command:** clear the copy-feedback timer on unmount ([c8bbe2f](https://github.com/front-factory/vitepress-theme/commit/c8bbe2f5a126d0550237a0b7ee9674b186a25fe2))

## [1.5.2](https://github.com/front-factory/vitepress-theme/compare/v1.5.1...v1.5.2) (2026-09-12)

### Bug Fixes

* **release:** add a Performance changelog section for perf commits ([26044d2](https://github.com/front-factory/vitepress-theme/commit/26044d2e6536dee315c90ee30bb9247867b7287d))

## [1.5.1](https://github.com/front-factory/vitepress-theme/compare/v1.5.0...v1.5.1) (2026-09-12)

### Performance

* **build:** compress the published stylesheet ([8c0e56c](https://github.com/front-factory/vitepress-theme/commit/8c0e56c6e3a47aeced17f99933dc936df65bcfa3))

## [1.5.0](https://github.com/front-factory/vitepress-theme/compare/v1.4.2...v1.5.0) (2026-09-11)

### Features

* **home:** add a themed sponsors section ([fb8c3db](https://github.com/front-factory/vitepress-theme/commit/fb8c3db346749c9a55cb45172c837b08dcf55119))

## [1.4.2](https://github.com/front-factory/vitepress-theme/compare/v1.4.1...v1.4.2) (2026-09-11)

### Bug Fixes

* **config:** extend Vite's fs.allow instead of replacing it ([30fdf17](https://github.com/front-factory/vitepress-theme/commit/30fdf17043d6bf41d68bed9bc497f0589f09b926))

## [1.4.1](https://github.com/front-factory/vitepress-theme/compare/v1.4.0...v1.4.1) (2026-09-11)

### Bug Fixes

* **home:** drop the hero meta strip's top margin ([9d748c4](https://github.com/front-factory/vitepress-theme/commit/9d748c4b23fc26218a64768f87810fd7ef3708f8))

## [1.4.0](https://github.com/front-factory/vitepress-theme/compare/v1.3.2...v1.4.0) (2026-09-11)

### Features

* **theme:** add ff.navSticky option to un-fix the nav and banner ([6d82b32](https://github.com/front-factory/vitepress-theme/commit/6d82b3266240e86357599ff28f768275735e5482))

### Bug Fixes

* **home:** shrink the features section's top/bottom padding ([4d9886d](https://github.com/front-factory/vitepress-theme/commit/4d9886dc5142249f85aae6a4663cb7f8f5b07763))

## [1.3.2](https://github.com/front-factory/vitepress-theme/compare/v1.3.1...v1.3.2) (2026-09-11)

### Bug Fixes

* **home:** even hero top spacing, top-align columns when uneven height ([2d8dd0a](https://github.com/front-factory/vitepress-theme/commit/2d8dd0a1e05c07abe8d42a10518a0e25299390df))

## [1.3.1](https://github.com/front-factory/vitepress-theme/compare/v1.3.0...v1.3.1) (2026-09-11)

### Bug Fixes

* **home:** tighten hero top spacing and drop grey band in ragged feature rows ([0edfcc3](https://github.com/front-factory/vitepress-theme/commit/0edfcc30aeca60aa8055f5fa0c2db4a01fac283a))

## [1.3.0](https://github.com/front-factory/vitepress-theme/compare/v1.2.0...v1.3.0) (2026-09-10)

### Features

* **hero:** support command tabs and a bare install panel ([6abb42c](https://github.com/front-factory/vitepress-theme/commit/6abb42ccbab64fd077b6d089e7d50be6f0bab4e1))

## [1.2.0](https://github.com/front-factory/vitepress-theme/compare/v1.1.0...v1.2.0) (2026-09-10)

### Features

* **banner:** add a rainbow variant ([8f92631](https://github.com/front-factory/vitepress-theme/commit/8f92631b2bfc6ce5cc80781a30230ba154616dba))
* **banner:** add variant, gradient and icon options ([c7894c2](https://github.com/front-factory/vitepress-theme/commit/c7894c2f36fbd4c75faeb2822354815b3185fc56))
* **footer:** pin a social column to the right of the link columns ([56db5b0](https://github.com/front-factory/vitepress-theme/commit/56db5b0608754c17b60aa6e72c25310ccec81819))
* **hero:** add hero.quote ([672d2c3](https://github.com/front-factory/vitepress-theme/commit/672d2c325464210adec53fca8c170b0933ea4559))
* **hero:** keep the install panel when the hero has an image ([ee8ed76](https://github.com/front-factory/vitepress-theme/commit/ee8ed76f39bdf46c9fffb56f1ac61e24a789d08a))
* **nav:** add an option to put the menu before the search box ([f25c5d2](https://github.com/front-factory/vitepress-theme/commit/f25c5d21a2ea96bb028b49bb34601f6743b13b1e))
* **playground:** derive the displayed version from package.json ([3758539](https://github.com/front-factory/vitepress-theme/commit/37585394f9d560f58a1f53581ba25ca32b59c35e))

### Bug Fixes

* **code:** give error/warning/diff line annotations a visible mark ([d4ae4dd](https://github.com/front-factory/vitepress-theme/commit/d4ae4dd8a24843608764d53960ca1c612cd7ab9e))

## [1.1.0](https://github.com/front-factory/vitepress-theme/compare/v1.0.0...v1.1.0) (2026-09-10)

### Features

* **home:** drop the accent mark from the hero kicker ([ba519ab](https://github.com/front-factory/vitepress-theme/commit/ba519ab5df9778c6db9890a3fdedd22affb842ca))
* **home:** tighten the hero headline ([3e92837](https://github.com/front-factory/vitepress-theme/commit/3e92837098c5e689f17b4ddd0bd953f739a55cb4))
* **home:** turn the hero glow off by default ([a520b78](https://github.com/front-factory/vitepress-theme/commit/a520b781f1f5d2c052ad8605fc973f51d8e74142))

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
