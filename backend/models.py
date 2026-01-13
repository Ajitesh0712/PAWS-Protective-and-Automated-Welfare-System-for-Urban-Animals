from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)

class MissingPet(Base):
    __tablename__ = "missing_pets"

    id = Column(Integer, primary_key=True, index=True)
    image_path = Column(String)
    location = Column(String)
    animal_type = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
