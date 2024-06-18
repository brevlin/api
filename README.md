# Brevlin API

## Description

API pour l'APP Brevlin

## Technologies

- Node.js
- NestJS
- Supabase (PostgreSQL)

## Diagramme de l'écosystème

```mermaid
graph TD
    A[APP] -->|Requête HTTP| B((API NestJS))
    B -->|Requête SQL| C((Supabase))
    C -->|Réponse SQL| B
    B -->|Réponse HTTP| A
```


## A faire

- Si la personne est déjà en attente d'inscription, ça ne lui envoie pas de mail