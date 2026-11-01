# MEDCARE Login Demo

A small demonstration project showing:
- Figma-inspired React login UI
- React calling a FastAPI endpoint
- Docker Compose running frontend and backend
- GitHub Actions building both Docker images on push / pull request

This is a **demo only**. It does not implement production authentication, user accounts,
password hashing, sessions, or database storage.

## Demo credentials
- Email: `admin@medcare.com`
- Password: `medcare123`

## Run locally (without Docker)

### Backend
```bash
cd backend
py -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
API docs: http://localhost:8000/docs

### Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal (usually http://localhost:5173).

## Run with Docker
Install and start Docker Desktop, then from this folder:
```bash
docker compose up --build
```
Open http://localhost:3000
- Backend API: http://localhost:8000
- Swagger docs: http://localhost:8000/docs

Stop:
```bash
docker compose down
```

## CI/CD demonstration
1. Create a GitHub repository and push this project.
2. Push to the `main` branch (or open a PR targeting `main`).
3. Open the repository's **Actions** tab.
4. Open the `MEDCARE Docker CI` run and show the frontend and backend image build jobs.

The workflow currently demonstrates **CI / build validation**: it builds Docker images but
does not publish or deploy them. For actual CD, a registry and deployment target must be
configured.

## Important implementation notes
- The frontend uses `/api/login`; Docker Compose routes `/api` to FastAPI using Nginx.
- For local Vite development, requests are proxied to `http://localhost:8000`.
- This demo uses fixed credentials and must not be used for real hospital or patient data.
