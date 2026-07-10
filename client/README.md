# Task Manager — Client

## 👉 [Live Demo](https://task-manager-client.web.app/)

> This is the **client** half of the Task Manager monorepo. The Express + MongoDB API lives in [`../server`](../server) (previously a separate `task-manager-client` / `task-manager-server` pair, since merged). Full project write-up: [root README](../README.md).

The React frontend of a MERN task-management app: create tasks, mark them complete, comment, edit, and delete, with server state managed by TanStack Query.

## What this demonstrates

- **CRUD workflows**: Interface for creating, reading, updating, and deleting tasks, including marking a task complete and commenting on it.
- **Server state management**: `TanStack React Query` caches every read and invalidates the affected query keys on each write, so lists refetch without manual state syncing.
- **Status-filtered views**: Completed and incomplete tasks are fetched from dedicated endpoints rather than filtered in the browser.
- **Form handling**: `React Hook Form` across sign-in, register, add-task, edit-task, and the comment modal.
- **Authentication (client-side)**: `Firebase Auth` for login/registration via email &amp; password and Google.
- **Responsive UI**: `React-Bootstrap` for a mobile-first interface.

## Architecture

The frontend of a full-stack MERN application. It communicates with the Node.js/Express backend in [`../server`](../server) over REST.

> **Trust model:** Firebase handles authentication in the browser. At this stage the API scopes task ownership by an `email` value passed in the request rather than by a verified token — a deliberate simplification for a learning build. See *Known limitations & next steps* in the [root README](../README.md).

## Tech stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 18, React Router 6 |
| **State** | TanStack React Query v4 |
| **Auth (client)** | Firebase v9 (email/password, Google) |
| **Forms** | React Hook Form v7 |
| **Styling** | React-Bootstrap v2 |

## What I'd extend next

- Send the Firebase ID token as a Bearer header and verify it server-side before trusting any `email`.
- Make task completion two-way (the current status endpoint only sets `complete`).
- Add unit/integration tests (currently CRA defaults only).
- Add drag-and-drop task reordering.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mahmud035/task-manager.git
   cd task-manager/client
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment setup**: provide your own Firebase web config in `src/firebase config/firebase.config.js`.
4. **Run**:
   ```bash
   npm start        # http://localhost:3000
   ```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.
