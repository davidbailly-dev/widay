# WIDAY - "What I Did Today"
## --- WORK IN PROGRESS ---

***A simple personal journal to keep track of your daily activities and notes.***

## Description

This application is a simple journal to create notes fastly about everything you do each day.

## Notes

No agentic AI was used to develop this project, only human brain.

## How to

### Configuration

1. Create and configure `.env` file at root directory (see `.env.example` file).
2. Create and configure `.env` file at backend directory (see `backend/.env.example` file).
3. Start MongoDB server container (see below).
4. Start backend (see below).
5. Start frontend (see below).

### Start MongoDB server container

```ini
sudo docker compose up -d
```

### Start backend (development environment)

```ini
cd backend
npm run dev
```

### Start frontend (development environment)

```ini
cd frontend
npm run dev
```

### Start using application

Launch your favorite web navigator and access to URL `http://localhost:3000`.

### Backup MongoDB database

```ini
sudo docker exec [container_id] mongodump --archive > ~/[dest_dir]/[filename].dump --username [root_username] --password [rootpassword] --authenticationDatabase admin
```
