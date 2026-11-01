from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(title="MEDCARE Demo API", version="1.0.0")

# Local Vite development. In Docker, Nginx proxies /api requests internally.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEMO_EMAIL = "admin@medcare.com"
DEMO_PASSWORD = "medcare123"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@app.get("/")
def health():
    return {"status": "ok", "service": "MEDCARE Demo API"}


@app.post("/api/login")
def login(payload: LoginRequest):
    # Demonstration only: fixed credentials, no real authentication.
    if payload.email == DEMO_EMAIL and payload.password == DEMO_PASSWORD:
        return {
            "success": True,
            "message": "Login successful. Welcome to MEDCARE!",
            "user": {"email": payload.email, "role": "Demo Staff"},
        }
    return {
        "success": False,
        "message": "Invalid email or password. Please try the demo credentials.",
    }
