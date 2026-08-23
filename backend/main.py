from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import datetime
import uvicorn

app = FastAPI(
    title="Yousif Tariq - Systems Core Gateway API",
    description="واجهة برمجة التطبيقات الخلفية لمعمارية السيرة الذاتية وأنظمة المهندس يوسف طارق",
    version="2.0.0"
)

# تمكين CORS لجميع الواجهات الأمامية
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# نماذج البيانات (Pydantic Models)
class ContactMessage(BaseModel):
    name: str
    email: str
    subject: Optional[str] = "General Inquiry"
    message: str

class SkillItem(BaseModel):
    name: str
    level: int
    desc: Optional[str] = ""

class SystemStatus(BaseModel):
    status: str
    latency_ms: float
    engineer: str
    uptime: str
    timestamp: str

# قاعدة بيانات تجريبية في الذاكرة
messages_db = []

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Quantum Systems Gateway Core is Active 🌌",
        "engineer": "Yousif Tariq (يوسف طارق)",
        "role": "Systems & Software Engineer",
        "docs_url": "/docs"
    }

@app.get("/api/status", response_model=SystemStatus, tags=["Health"])
def get_system_status():
    return {
        "status": "ONLINE // TLS 1.3 ENCRYPTED",
        "latency_ms": 1.2,
        "engineer": "Yousif Tariq",
        "uptime": "99.99%",
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

@app.post("/api/contact", status_code=status.HTTP_201_CREATED, tags=["Contact"])
def dispatch_contact_signal(msg: ContactMessage):
    if not msg.name or not msg.email or not msg.message:
        raise HTTPException(status_code=400, detail="Missing required signal fields.")
    
    saved_entry = {
        "id": len(messages_db) + 1,
        "name": msg.name,
        "email": msg.email,
        "subject": msg.subject,
        "message": msg.message,
        "received_at": datetime.datetime.utcnow().isoformat()
    }
    messages_db.append(saved_entry)
    
    return {
        "success": True,
        "status": "DISPATCH_CONFIRMED",
        "message": f"Signal received from {msg.name}. Encrypted route established.",
        "payload": saved_entry
    }

@app.get("/api/messages", tags=["Admin / Telemetry"])
def list_dispatched_signals():
    return {
        "total_messages": len(messages_db),
        "signals": messages_db
    }

if __name__ == "__main__":
    print("==================================================")
    print("🚀 تشغيل خادم البايثون (FastAPI Backend Gateway)")
    print("🌐 الرابط: http://localhost:8000")
    print("📖 التوثيق التفاعلي (Swagger UI): http://localhost:8000/docs")
    print("==================================================")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
