# Note

## Objectif
Décrire une `note` dans le projet.

## Définition
Une `note` est une entrée dans le journal personnel de l'utilisateur.

## Données
- `id` : entier
- `date` : date/heure ISO 8601
- `content` : chaîne de caractère, max 10000 caractères
- `tag` : tableau de `tag`, max 5 éléments
- `createdAt` : date/heure ISO 8601
- `updatedAt` : date/heure ISO 8601

## Concepts liés
- `tag`

## Règle métier
- une `note` appartient à un seul utilisateur
- une `note` peut avoir aucun, un seul ou plusieurs `tag`

## Cycle métier général
- une `note` est créée par l'utilisateur
- les dernières `note` entrées par l'utilisateur sont affichées par défaut
- un utilisateur peut rechercher une ou plusieurs `note`

## Cas particulier
- aucun

## Références associées
- `tag.md`