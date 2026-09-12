export default {
    extends: [
        '@front-factory/stylelint-config'
    ],
    rules: {
        // House style throughout src/styles: `// === //` banner comments and `/** */` doc blocks
        // are deliberate, not stray loud/empty comments.
        'scss/comment-no-empty': null,
        'scss/comment-no-loud': null,
        // Selectors are intentionally reopened in separate, commented sections (e.g. `.ff-theme`
        // once per concern) rather than merged into one block.
        'no-duplicate-selectors': null,
        // The theme layers `.ff-theme <selector>` overrides on top of VitePress defaults;
        // specificity, not source order, decides the cascade here, so reordering rules to
        // satisfy this rule risks the opposite: masking which override actually wins.
        'no-descending-specificity': null
    }
};
