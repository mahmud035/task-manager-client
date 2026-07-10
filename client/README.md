# Task Manager - Client

## 👉 [Live Demo](https://task-manager-client.web.app/)

A full-stack task management application featuring authentication, task CRUD operations, and efficient server-state management.

## What this demonstrates

- **CRUD Workflows**: Complete interface for creating, reading, updating, and deleting tasks, including task completion toggling and commenting.
- **Server State Management**: Utilized `TanStack React Query` to efficiently cache and synchronize server state, minimizing unnecessary API calls.
- **Authentication**: Integrated `Firebase Auth` for secure user login/registration.
- **Form Handling**: Implemented robust forms using `React Hook Form`.
- **Responsive UI**: Built with `React-Bootstrap` for a mobile-first, responsive interface.

## Architecture

This is the frontend component of a full-stack MERN application. It communicates with a custom [Node.js/Express backend](https://github.com/mahmud035/task-manager-server), managing user-specific data via Firebase Auth tokens and REST API endpoints.

## Tech stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 18, React Router 6 |
| **State** | TanStack React Query v4 |
| **Auth** | Firebase v9 |
| **Forms** | React Hook Form v7 |
| **Styling** | React-Bootstrap v2 |

## What I'd extend next

- Implement more comprehensive unit/integration testing (currently utilizing standard CRA defaults).
- Optimize backend API query parameters for better performance on large user task lists.
- Add drag-and-drop task reordering functionality.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:mahmud035/task-manager-client.git
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**: Add necessary Firebase config credentials.
4. **Run**:
   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.
