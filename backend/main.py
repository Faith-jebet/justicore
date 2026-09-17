from fastapi import FastAPI, Depends, HTTPException, Form
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session
import models, schemas
from database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Justicore API")

# Configure CORS for PWA frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev only, update for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Justicore Worker Protection API"}

@app.post("/reports/", response_model=schemas.ReportResponse)
def create_report(report: schemas.ReportCreate, db: Session = Depends(get_db)):
    db_report = models.Report(**report.model_dump())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

@app.get("/reports/", response_model=list[schemas.ReportResponse])
def read_reports(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    reports = db.query(models.Report).offset(skip).limit(limit).all()
    return reports

@app.post("/ussd")
def ussd_callback(
    sessionId: str = Form(...),
    serviceCode: str = Form(...),
    phoneNumber: str = Form(...),
    text: str = Form(""),
    db: Session = Depends(get_db)
):
    parts = text.split('*') if text else []
    
    if text == "":
        response = "CON Welcome to Justicore Worker Protection\n"
        response += "1. Report an Incident\n"
        response += "2. Check Case Status\n"
        response += "3. Rights Information"
    elif parts[0] == "1":
        if len(parts) == 1:
            response = "CON Enter your Estate Name or Location:"
        elif len(parts) == 2:
            response = "CON Enter a brief description of the incident:"
        elif len(parts) == 3:
            response = "CON Do you want to report anonymously?\n1. Yes\n2. No"
        elif len(parts) == 4:
            estate = parts[1]
            desc = parts[2]
            is_anon = parts[3] == "1"
            
            description_text = f"Estate: {estate}\n\n{desc}\n\nAnonymous: {is_anon}\n\nReported via USSD ({'Anonymous' if is_anon else phoneNumber})"
            db_report = models.Report(title="USSD Incident Report", description=description_text)
            db.add(db_report)
            db.commit()
            db.refresh(db_report)
            
            response = f"END Your report has been submitted securely.\nYour Reference ID is REP-{str(db_report.id).zfill(3)}"
        else:
            response = "END Invalid input."
    elif parts[0] == "2":
        response = "END Case Status feature is currently in development."
    elif parts[0] == "3":
        response = "END Your Rights:\n- Fair remuneration\n- Safe working conditions\n- Protection from sexual harassment\n- Right to fair labour practices."
    else:
        response = "END Invalid choice."

    return PlainTextResponse(response)
