# Task Manager

**A MERN task-management app — React + Firebase authentication, TanStack Query for server state, Express + MongoDB CRUD API.**

🔗 **Live:** https://task-manager-client.web.app/

Task Manager lets a signed-in user create tasks, mark them complete, comment on them, edit, and delete — with completed and incomplete tasks served from dedicated endpoints. It was built to practice server-state management with TanStack Query and a full CRUD lifecycle across a React client and an Express/MongoDB API.

> Scope note: a learning project with no real users. Authentication is **client-side only** — see *Known limitations*, where the API's trust model is stated plainly rather than glossed over.

---

## What this demonstrates

- **Goal:** keep server data fresh without hand-rolled fetch logic → **Approach:** TanStack Query owns every read, with mutations invalidating the relevant query keys → **Outcome:** task lists refetch automatically after create/edit/complete/delete, with no manual state syncing.
- **Goal:** filter by completion status without shipping the whole list → **Approach:** dedicated `/incompleteTasks/:email` and `/completedTasks/:email` endpoints filter in MongoDB → **Outcome:** the client fetches only the subset it renders.
- **Goal:** validated forms without boilerplate → **Approach:** React Hook Form across sign-in, register, add-task, edit-task, and the comment modal → **Outcome:** consistent validation and submission handling in six components.
- **Goal:** gate the app behind a login → **Approach:** a Firebase `AuthProvider` context (email/password + Google) feeding protected routes → **Outcome:** unauthenticated users are redirected away from task views.
- **Goal:** attach a note to a task → **Approach:** a comment modal writing through `PUT /addComment/:id` → **Outcome:** per-task commenting backed by a single document update.

---

## Architecture

```
┌──────────────────────────────┐        ┌────────────────────────────────┐
│  Client (React SPA)           │  HTTP  │  Server (Express)              │
│                              │ ─────▶ │                                │
│  • AuthProvider (Firebase)    │        │  • CRUD routes over /alltask   │
│  • TanStack Query (server     │ ◀───── │  • status-filtered reads       │
│    state + invalidation)      │  JSON  │    (/incompleteTasks/:email)   │
│  • React Hook Form            │        │  • cors + express.json         │
└──────────────────────────────┘        └───────────────┬────────────────┘
        │                                                ▼
        ▼                                     MongoDB Atlas (native driver)
  Firebase Authentication                     taskManagerDBUser · allTask
  (email/password · Google)
        │
        └─▶ identity lives in the browser only; no token reaches the API
```

**Trust model (stated honestly):** Firebase authenticates the user in the browser. The API does **not** verify any token — it scopes tasks by an `email` value supplied in the query string or path.

---

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | React 18.2, React Router DOM 6.6, React-Bootstrap 2.7, react-icons, AOS |
| Server state | TanStack Query 4.20 |
| Forms | React Hook Form 7.41 |
| Auth (client) | Firebase 9.15 Authentication (email/password, Google) |
| UX | react-toastify 9.1, react-loader-spinner |
| Backend | Node.js, Express 4.18, MongoDB native driver 4.13 |
| Hosting | Firebase Hosting (client) · Vercel (API) |

---

## API surface

| Method | Route | Purpose |
|---|---|---|
| GET | `/mytasks?email=` | all tasks for a user |
| GET | `/incompleteTasks/:email` | status-filtered read |
| GET | `/completedTasks/:email` | status-filtered read |
| GET | `/editReview/:id` | fetch one task for editing |
| GET | `/commentTask/:id` | fetch one task for commenting |
| POST | `/alltask` | create a task |
| PUT | `/addComment/:id` | set a task's comment |
| PATCH | `/updateReview/:id` | rename a task |
| PATCH | `/updateStatus/:id` | mark a task complete |
| DELETE | `/deleteTask/:id` | delete a task |

---

## Deep-dive — server state with TanStack Query

The piece worth examining is how the client stays consistent. Every task view (`MyTasks`, `CompletedTasks`, `NotCompletedTasks`) is a query keyed by the user's email and the view's status; every write (add, edit, complete, comment, delete) invalidates the affected keys rather than mutating local state by hand. Combined with the status-filtered endpoints, this means a "mark complete" action moves a task between two independently-cached lists with a single invalidation, and the UI never holds a stale copy it has to reconcile. This is the difference between caching server data and *owning* it in component state — and it's the concept the project set out to practice.

---

## Known limitations (honest, and next on the list)

- **The API is unauthenticated.** No route verifies a Firebase ID token; user scoping relies on an `email` string passed by the caller. Anyone who knows an email address can read, modify, or delete that user's tasks. The fix is to send the Firebase ID token as a Bearer header and verify it server-side (Firebase Admin SDK) before trusting any `email`.
- **Completion is one-way.** `PATCH /updateStatus/:id` unconditionally sets `status: 'complete'`; there is no un-complete path. It should accept the target status.
- **Legacy route names.** Task routes are named from an earlier review-oriented iteration (`/editReview`, `/updateReview`) and should be renamed to match the domain.
- **No server-side validation.** Request bodies are trusted as-is; a schema layer belongs at the edge.

---

## Run locally

```bash
git clone https://github.com/mahmud035/task-manager.git
cd task-manager

# Client
cd client
npm install
npm start                # http://localhost:3000

# Server (second terminal)
cd ../server
npm install
npm run start-dev        # nodemon, http://localhost:5000
```

**Server env (`server/.env`):**

```
DB_USER=...
DB_PASSWORD=...
PORT=5000
```

Provide your own Firebase web config in `client/src/firebase config/firebase.config.js`.
