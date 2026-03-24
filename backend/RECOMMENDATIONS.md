# Backend Recommendations (Prioritized for Render)

## P0: Must-Have Before First Deploy
- Validate environment variables at startup (`DB_USER`, `DB_PASSWORD`, `DB_CLUSTER`, `DB_NAME`, `PORT`) to avoid silent misconfigurations. See `backend/src/config/database.ts`, `backend/src/server.ts`.
- Restrict CORS to the Vercel domain(s) in production. See `backend/src/app.ts`.
- Add a simple `/health` endpoint for Render health checks. See `backend/src/routes/index.ts`.
- Point `main` to `dist/server.js` if deploying the build output. See `backend/package.json`.

## P1: Strongly Recommended
- Validate `POST /api/notes` body (`date`, `content`, `tags`) before hitting the database. See `backend/src/controllers/noteController.ts`.
- Validate and constrain query params (`limit`, `dateStart`, `dateEnd`, `search`). See `backend/src/controllers/noteController.ts`.
- Handle common Mongoose errors explicitly (e.g., validation errors, cast errors) to return clean API responses. See `backend/src/app.ts`.
- Fix the `tags` validator type to match `Tag[]`. See `backend/src/models/note.ts`.
- Type `Request` params and body in controllers. See `backend/src/controllers/noteController.ts`.

## P2: Nice-To-Have
- Add explicit pagination (e.g., `limit` + `offset` or `page`) and stable sorting. See `backend/src/controllers/noteController.ts`.
- Decide on behavior when only one of `dateStart` or `dateEnd` is provided.
- Add `helmet` for security headers. See `backend/src/app.ts`.
- Add rate limiting on public endpoints. See `backend/src/app.ts`.
- Add a graceful shutdown handler (`SIGINT`, `SIGTERM`) to close the Mongo connection. See `backend/src/server.ts`.
- Consider structured logging (e.g., `pino`) for production. See `backend/src/app.ts`.
