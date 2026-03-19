# MatchMaker

A simple matchmaking web application with a Tornado-based backend and a Vite/React frontend.

## Repository structure

- `backend/` - Python Tornado API server and handlers
- `frontend/` - React app (Vite + Tailwind)

## Prerequisites

- Python 3.9+
- Node.js 18+ (npm)
- MySQL server

## Backend setup

1. From repo root, create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate   # Windows
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure MySQL database (as used in `backend/db.py`):
#configure with your own credentials
   - host: `[LOCALHOST]`
   - user: `[USER]`
   - password: `[PASSWORD]`
   - database: `[DATABASE]`

4.  create database matchmaker;
    use matchmaker;

    Create `users` table if missing (example):
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255),
     email VARCHAR(255) UNIQUE,
     password VARCHAR(255),
     age INT,
     gender VARCHAR(50),
     interests TEXT
   );
   ```

5. Run API server:
   ```bash
   python backend/app.py
   ```
   Backend listens on `http://localhost:8888`.

## Frontend setup

1. Change to frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open the URL printed by Vite (typically `http://localhost:5173`).

## API endpoints

- `POST /register` - user registration
- `POST /login` - sign-in
- `POST /search` - matchmaking search

## Notes

- Update `backend/db.py` connection values for production settings.
- Sensitive secrets should be moved to environment variables and not tracked in git.
