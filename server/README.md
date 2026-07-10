# Task Manager — Server

> This is the **server** half of the Task Manager monorepo. The React client lives in [`../client`](../client). Full project write-up: [root README](../README.md).

## Description

The backend API for Task Manager: RESTful endpoints for CRUD on user tasks, backed by MongoDB Atlas. It is a single Express service; at this stage token verification is handled as a next step rather than in the API (see below).

## What this demonstrates

- **RESTful API design**: A full set of CRUD endpoints over the `allTask` collection.
- **Status-filtered reads**: Dedicated endpoints (`/incompleteTasks/:email`, `/completedTasks/:email`) filter in the database so the client fetches only the subset it renders.
- **Database integration**: Persistent data on MongoDB Atlas via the native `mongodb` driver.
- **Middleware**: `cors` and `dotenv` for cross-origin handling and configuration.

## Architecture

A Node.js/Express server between the React client and MongoDB.

> **Auth (next step):** the API currently scopes task ownership by an `email` value from the request rather than by a verified Firebase token — a deliberate simplification for a learning build. Verifying the token server-side is the planned next step; see the [root README](../README.md).

## API surface

| Method | Route | Purpose |
| :--- | :--- | :--- |
| GET | `/mytasks?email=` | all tasks for a user |
| GET | `/incompleteTasks/:email` | status-filtered read |
| GET | `/completedTasks/:email` | status-filtered read |
| GET | `/editReview/:id` | one task, for editing |
| GET | `/commentTask/:id` | one task, for commenting |
| POST | `/alltask` | create a task |
| PUT | `/addComment/:id` | set a task's comment |
| PATCH | `/updateReview/:id` | rename a task |
| PATCH | `/updateStatus/:id` | mark a task complete |
| DELETE | `/deleteTask/:id` | delete a task |

> Route names ending in `Review` are legacy from an earlier iteration of the project and should be renamed to match the task domain.

## Tech stack

| Layer | Technology |
| :--- | :--- |
| **Runtime** | Node.js |
| **Framework** | Express.js v4 |
| **Database** | MongoDB (Atlas) |
| **Driver** | MongoDB Native Driver v4 |

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mahmud035/task-manager.git
   cd task-manager/server
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment variables**: configure a `.env` file with `DB_USER`, `DB_PASSWORD`, and `PORT`.
4. **Run**:
   ```bash
   npm run start-dev      # nodemon, http://localhost:5000
   ```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.
