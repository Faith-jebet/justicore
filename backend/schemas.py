from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from models import RoleEnum, ReportStatus

class UserBase(BaseModel):
    username: str
    role: RoleEnum = RoleEnum.WORKER

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True # updated for pydantic v2

class ReportBase(BaseModel):
    title: str
    description: str

class ReportCreate(ReportBase):
    pass

class ReportResponse(ReportBase):
    id: int
    status: ReportStatus
    created_at: datetime
    reporter_id: Optional[int] = None

    class Config:
        from_attributes = True # updated for pydantic v2
