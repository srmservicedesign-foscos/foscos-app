from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os

from backend.firebase_auth import init_firebase
from backend.routes.auth import router as auth_router
from backend.routes.applications import router as app_router
from backend.routes.officer import router as officer_router
from backend.routes.consumers import router as consumer_router
from backend.routes.dashboard import router as dashboard_router
from backend.config import FIREBASE_WEB_CONFIG, SUPABASE_URL, SUPABASE_ANON_KEY

app = FastAPI(title="FoSCoS API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

# Include routers
app.include_router(auth_router)
app.include_router(app_router)
app.include_router(officer_router)
app.include_router(consumer_router)
app.include_router(dashboard_router)


@app.on_event("startup")
async def startup():
    init_firebase()


@app.get("/api/config")
async def get_public_config():
    """
    Serves Firebase web config + Supabase public keys to the frontend.
    Only public/anon keys — service role key is never exposed.
    """
    return JSONResponse({
        "firebase": FIREBASE_WEB_CONFIG,
        "supabase": {
            "url": SUPABASE_URL,
            "anon_key": SUPABASE_ANON_KEY,
        }
    })


@app.get("/")
async def serve_citizen():
    return FileResponse("frontend/citizen.html")


@app.get("/officer")
async def serve_officer():
    return FileResponse("frontend/officer.html")


@app.get("/health")
async def health():
    return {"status": "ok"}
