from pydantic import BaseModel
from datetime import datetime

class WorkoutCreate(BaseModel):
    exercise: str
    sets: int
    reps: int
    weights: float

class WorkoutResponse(BaseModel):
    id: int
    user_id: int
    exercise: str
    sets: int
    reps: int
    weight: float
    logged_at: datetime

    class Config:
        from_attributes = True