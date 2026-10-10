from pydantic import BaseModel
from typing import List, Optional
import datetime

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: int
    class Config:
        orm_mode = True

class AssignmentBase(BaseModel):
    title: str
    language: str

class AssignmentCreate(AssignmentBase):
    course_id: int

class Assignment(AssignmentBase):
    id: int
    course_id: int
    class Config:
        orm_mode = True

class SubmissionBase(BaseModel):
    student_name: str
    source_code: str
    assignment_id: int

class SubmissionCreate(SubmissionBase):
    pass

class Submission(SubmissionBase):
    id: int
    created_at: datetime.datetime
    class Config:
        orm_mode = True

class ComparisonResultBase(BaseModel):
    assignment_id: int
    sub1_id: int
    sub2_id: int
    overall_similarity: float
    baseline_similarity: float
    structural_similarity: float
    evidence_json: str
    review_status: str
    review_notes: Optional[str]

class ComparisonResult(ComparisonResultBase):
    id: int
    class Config:
        orm_mode = True
        
class ReviewUpdate(BaseModel):
    review_status: str
    review_notes: Optional[str] = None
