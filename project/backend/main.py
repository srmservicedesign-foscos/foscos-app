from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

from routes import consumer, fbo, fso

app = FastAPI(
    title="Grievance Portal API",
    description="Food safety grievance portal (FoSCoS inspired)",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(consumer.router, prefix="/api/consumer", tags=["consumer"])
app.include_router(fbo.router, prefix="/api/fbo", tags=["fbo"])
app.include_router(fso.router, prefix="/api/fso", tags=["fso"])


BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"

app.mount(
    "/static",
    StaticFiles(directory=str(FRONTEND_DIR / "shared")),
    name="static",
)
app.mount(
    "/consumer",
    StaticFiles(directory=str(FRONTEND_DIR / "consumer"), html=True),
    name="consumer",
)
app.mount(
    "/fbo",
    StaticFiles(directory=str(FRONTEND_DIR / "fbo"), html=True),
    name="fbo",
)
app.mount(
    "/fso",
    StaticFiles(directory=str(FRONTEND_DIR / "fso"), html=True),
    name="fso",
)


@app.get("/")
def root():
    return FileResponse(str(FRONTEND_DIR / "consumer" / "index.html"))


@app.get("/health")
def health():
    return {"status": "ok"}
