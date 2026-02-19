from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# database url
SQLALCHEMY_DATABASE_URL = "sqlite:///./workouts.db"

# engine creation
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# session factory creation
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# base class of all models
Base = declarative_base()

# dependency for db session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()