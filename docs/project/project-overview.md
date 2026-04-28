# Project Overview

## Project
- Name: Widay
- Description: "What I Did Today"

## Goal
Tenir un journal simple d'une journée de travail ou de vie personnelle et pouvoir rechercher des notes ou des tâches réalisées.

## Features
- Créer une nouvelle note
- Ajouter des tags à une note
- Modifier une note
- Supprimer une note
- Rechercher des notes par contenu et tags

## Contraintes
- La recherche et la saisie de notes doit être simple et rapide

## Entities
### Tasks
- Date
- Tags
- Content :
	- La création et la modification d'une tâche se fait en code source MarkDown
	- L'affichage des tâches existantes se fait en rendu MarkDown

## Stack
### Commons
- Node.js v24
- Javascript/TypeScript

### Backend
- Javascript/TypeScript
- Express.js
- Mongoose

### Frontend
- React.js
- Next.js
- TailWindCSS
- react-markdown

### Database
- MongoDB externe au serveur backend et frontend

## Environment
- development
- test
- production

## Scripts
- dev
- lint
- test
- prod

## Deployment
- `backend` -> Render
- `frontend` -> Render
- `database` -> MongoDB Atlas

## Code Validation
- Le code doit toujours être validé par eslint
