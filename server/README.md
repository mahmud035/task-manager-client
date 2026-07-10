# Task Manager - Server

## Description

The backend API for the Task Manager application, providing RESTful endpoints for managing user-specific tasks and authentication-related data.

## What this demonstrates

- **RESTful API Design**: Implemented a comprehensive set of endpoints for CRUD operations (Create, Read, Update, Delete) on task data.
- **Efficient Filtering**: Built specialized endpoints (e.g., `/incompleteTasks/:email`) to offload task filtering logic to the database, improving frontend efficiency.
- **Database Integration**: Managed persistent data using MongoDB Atlas, utilizing the native `mongodb` driver.
- **Middleware Usage**: Implemented `cors` for cross-origin resource sharing and `dotenv` for configuration management.

## Architecture

A Node.js/Express server that acts as an intermediary between the React client and a MongoDB database.

## Tech stack

| Layer | Technology |
| :--- | :--- |
| **Runtime** | Node.js |
| **Framework** | Express.js v4 |
| **Database** | MongoDB (Atlas) |
| **Driver** | MongoDB Native Driver |

## Deep-dive: Task Filtering

The API optimizes client-side performance by providing dedicated status-based endpoints (e.g., `/incompleteTasks/:email` and `/completedTasks/:email`). This ensures the client only fetches the necessary subset of tasks, reducing payload size and processing time on the React frontend.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:mahmud035/task-manager-server.git
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**: Configure a `.env` file with `DB_USER`, `DB_PASSWORD`, and `PORT`.
4. **Run**:
   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.
