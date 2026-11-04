---
wide: true
---

# Mise en page large

`wide: true` dans le frontmatter élargit la colonne de texte à toute la bande et masque le sommaire, pour les tableaux et les listes d'API qui ont besoin de place.

## Comparatif

| Jeton | Clair | Sombre | Utilisé par | Notes |
| --- | --- | --- | --- | --- |
| `--ff-color-accent` | `#2745cf` | `#94a8ff` | Liens, marqueurs, anneaux de focus | Remplacé en bloc par `ff.preset`. |
| `--ff-color-rule` | gris filet | gris filet | Filets de section, tableaux, pied de page | S'estompe vers la droite sous chaque `h2`. |
| `--ff-motion-duration` | `0.2s` | `0.2s` | Transitions au survol | Ramené à zéro sous `prefers-reduced-motion`. |
| `--ff-layout-wide` | `76rem` | `76rem` | Accueil, navigation, pages larges | Définit aussi la bande extérieure de chaque page. |
