from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import models, schemas, database, engine

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="CodeGuard AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "CodeGuard AI API is running"}

@app.post("/api/projects", response_model=schemas.Course)
def create_course(course: schemas.CourseCreate, db: Session = Depends(database.get_db)):
    db_course = models.Course(**course.dict())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@app.get("/api/projects", response_model=list[schemas.Course])
def get_courses(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return db.query(models.Course).offset(skip).limit(limit).all()

@app.post("/api/assignments", response_model=schemas.Assignment)
def create_assignment(assignment: schemas.AssignmentCreate, db: Session = Depends(database.get_db)):
    db_assignment = models.Assignment(**assignment.dict())
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

@app.get("/api/assignments", response_model=list[schemas.Assignment])
def get_assignments(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return db.query(models.Assignment).offset(skip).limit(limit).all()

@app.post("/api/submissions", response_model=schemas.Submission)
def create_submission(submission: schemas.SubmissionCreate, db: Session = Depends(database.get_db)):
    db_submission = models.Submission(**submission.dict())
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission

@app.get("/api/submissions", response_model=list[schemas.Submission])
def get_submissions(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return db.query(models.Submission).offset(skip).limit(limit).all()

@app.post("/api/analysis/compare")
def run_comparison(sub1_id: int, sub2_id: int, db: Session = Depends(database.get_db)):
    sub1 = db.query(models.Submission).filter(models.Submission.id == sub1_id).first()
    sub2 = db.query(models.Submission).filter(models.Submission.id == sub2_id).first()
    
    if not sub1 or not sub2:
        raise HTTPException(status_code=404, detail="Submissions not found")
        
    result = engine.compare_submissions(sub1.source_code, sub2.source_code)
    
    db_result = models.ComparisonResult(
        assignment_id=sub1.assignment_id,
        sub1_id=sub1.id,
        sub2_id=sub2.id,
        **result
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result

@app.get("/api/analysis/results", response_model=list[schemas.ComparisonResult])
def get_results(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return db.query(models.ComparisonResult).offset(skip).limit(limit).all()
    
@app.patch("/api/reviews/{result_id}", response_model=schemas.ComparisonResult)
def update_review(result_id: int, review: schemas.ReviewUpdate, db: Session = Depends(database.get_db)):
    db_result = db.query(models.ComparisonResult).filter(models.ComparisonResult.id == result_id).first()
    if not db_result:
        raise HTTPException(status_code=404, detail="Result not found")
    
    db_result.review_status = review.review_status
    if review.review_notes:
        db_result.review_notes = review.review_notes
        
    db.commit()
    db.refresh(db_result)
    return db_result

@app.get("/api/dashboard/summary")
def get_dashboard_summary(db: Session = Depends(database.get_db)):
    return {
        "total_projects": db.query(models.Course).count(),
        "total_assignments": db.query(models.Assignment).count(),
        "total_submissions": db.query(models.Submission).count(),
        "total_analyses": db.query(models.ComparisonResult).count(),
        "pending_reviews": db.query(models.ComparisonResult).filter(models.ComparisonResult.review_status == "Pending").count()
    }
