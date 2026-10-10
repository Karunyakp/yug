from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Text, DateTime
from sqlalchemy.orm import relationship
import datetime
from .database import Base

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    assignments = relationship("Assignment", back_populates="course")

class Assignment(Base):
    __tablename__ = "assignments"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    language = Column(String)
    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="assignments")
    submissions = relationship("Submission", back_populates="assignment")

class Submission(Base):
    __tablename__ = "submissions"
    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String, index=True)
    source_code = Column(Text)
    assignment_id = Column(Integer, ForeignKey("assignments.id"))
    assignment = relationship("Assignment", back_populates="submissions")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ComparisonResult(Base):
    __tablename__ = "comparison_results"
    id = Column(Integer, primary_key=True, index=True)
    assignment_id = Column(Integer, ForeignKey("assignments.id"))
    sub1_id = Column(Integer, ForeignKey("submissions.id"))
    sub2_id = Column(Integer, ForeignKey("submissions.id"))
    overall_similarity = Column(Float)
    baseline_similarity = Column(Float)
    structural_similarity = Column(Float)
    evidence_json = Column(Text)
    review_status = Column(String, default="Pending") # Pending, Reviewed, Flagged, Dismissed
    review_notes = Column(Text, nullable=True)
