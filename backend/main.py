import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from api import app
from config.config import config

app.add_middleware(
    CORSMiddleware,
    allow_origins=[config.CORS_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=config.BACKEND_PORT)