from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import user
from app.routes import auth
from app.models import workout
from app.routes import workout


app = FastAPI()
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # React App Url
    allow_credentials=True,
    allow_methods=["*"], # Allows methods (GET, POST, DEL, etc.)
    allow_headers=["*"] # Allows all headers
)

app.include_router(auth.router)
app.include_router(workout.router)
@app.get("/")
def read_root():
    return {"message": "Workout App is active"}
