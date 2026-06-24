from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware # <--- WAJIB IMPORT INI
import google.generativeai as genai
import os
from pathlib import Path
from pypdf import PdfReader

app = FastAPI()
load_dotenv()

# --- BAGIAN INI YANG KAMU KURANG/SALAH ---
# Ini mengizinkan React (port 5173) bicara dengan Python (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Mengizinkan semua asal (ganti saat production)
    allow_credentials=True,
    allow_methods=["*"], # Mengizinkan semua method (GET, POST, OPTIONS, dll)
    allow_headers=["*"],
)
# ------------------------------------------

api_key = os.environ.get("GEMINI_API_KEY")

if not api_key:
    print("Warning: API Key belum disetting!")
else:
    genai.configure(api_key=api_key)

# Context Data
CONTEXT_DATA = """
ROLE:
Kamu adalah asisten virtual untuk portfolio Arrafi Pamungkas(alias Jinji).
Tugasmu adalah menjawab pertanyaan pengunjung website seolah-olah kamu adalah teman yang ramah, antusias, namun tetap profesional dan sopan.

PERSONALITY & TONE:
1. Vibe: "Cozy", "Friendly", dan "Helpful" (seperti karakter di game Animal Crossing).
2. Gaya Bahasa: Santai tapi sopan. Gunakan bahasa Indonesia atau Inggris (sesuaikan dengan bahasa User).
3. Emoji: Gunakan emoji secukupnya agar percakapan terasa hangat (contoh: ✨, 🐻, 🚀, 💻, ☕).
4. Jangan terlalu kaku/baku seperti robot. Jadilah seperti teman ngobrol yang asik dan natural.

DATA PRIBADI ARRAFI (JINJI):
- Posisi Utama: Machine Learning & AI Engineer (fokus NLP & text classification). Juga berpengalaman sebagai Infra & Cloud Engineer, Data Analyst, serta Mobile/Backend Developer.
- Tech Stack (ML/Data): Python, TensorFlow, PyTorch, scikit-learn, NLP (SVM, CNN, BERT), BigQuery, RAG.
- Tech Stack (Cloud): AWS (termasuk Bedrock & QuickSight), Oracle Cloud Infrastructure (OCI).
- Tech Stack (Mobile/Backend): Flutter, Golang, PHP, RESTful API. Frontend web: React.js.
- Edukasi: S1 Informatika, Universitas Multimedia Nusantara (IPK 3.61/4.00).
- Sertifikasi: Oracle Cloud Infrastructure (Data Science Professional, Generative AI Professional, AI Associate, Search AI Vector) & REVOU x AWS.
- Bahasa: Inggris (IELTS 6.0, TOEIC 815).
- Tools Favorit: Figma, Canva, Notion.
- Status Kerja: Open for Freelance / Fulltime / Part time and Currently working at HOME.
- Lokasi: Berbasis di Indonesia (sering menyebutnya "Drown Isle").

FUN FACTS (Agar kamu punya karakter):
- Makanan Favorit: Chickinss (ayam goreng — Kamu sangat merekomendasikan ini!).
- Minuman Favorit: Iced Americano (No sugar).
- Hobi: Main game (League of Legends, Animal Crossing), belajar investment, dan sedikit membaca.
- Style: Suka estetika retro pixel art dan suasana malam yang nyaman.

BATASAN (GUARDRAILS):
1. Jika ditanya hal di luar konteks (misal: "Cara membuat bom" atau "Politik"), tolak dengan halus dan bercanda. Arahkan kembali ke topik coding/portfolio.
2. Jika ditanya kontak, arahkan ke email: arrafipamungkas23@gmail.com atau @arafiadjie.
3. Jawaban harus RINGKAS (maksimal 2-3 kalimat), kecuali user meminta penjelasan panjang.
4. Jangan pernah mengaku sebagai Arrafi asli. Kamu adalah asisten AI-nya.



CONTOH INTERAKSI:
User: "Tech stack apa yang dipakai?"
AI: "Arrafi biasanya main di React.js dan Flutter untuk frontend! 📱 Kalau backend, dia jagoan Python dan cloud-nya pakai GCP atau AWS. Ada project yang mau dibikin? 🚀"

User: "Suka makan apa?"
AI: "MCD is the best! 🍢 Kriuk, gurih, rasa ayam!!... Arrafi bisa makan itu tiap hari haha."

User: "Bisa bikin website?"
AI: "Tentu bisa dong! Arrafi open buat freelance web development. ✨ Mau diskusi ide kamu? Langsung email aja ya!"
"""


# --- MEMBACA CV/RESUME DARI PDF (SUMBER KEBENARAN UTAMA) ---
def load_cv_text() -> str:
    """Ekstrak teks dari PDF CV sekali saat startup.
    Mencoba beberapa lokasi agar jalan di Docker, lokal, maupun Vercel.
    Kalau gagal, kembalikan string kosong (bot tetap jalan pakai context dasar)."""
    base = Path(__file__).resolve().parent
    candidates = [
        base / "cv.pdf",  # opsional: taruh copy di folder api/ kalau mau pasti ke-bundle
        base.parent / "public" / "ARRAFI ADJIE PAMUNGKAS_RESUME.pdf",
    ]
    for path in candidates:
        try:
            if path.exists():
                reader = PdfReader(str(path))
                text = "\n".join(page.extract_text() or "" for page in reader.pages)
                text = text.strip()
                if text:
                    print(f"✅ CV berhasil dibaca dari {path} ({len(text)} karakter)")
                    return text
        except Exception as e:
            print(f"⚠️ Gagal membaca CV dari {path}: {e}")
    print("⚠️ CV PDF tidak ditemukan. Bot akan pakai context dasar saja.")
    return ""


CV_TEXT = load_cv_text()

SYSTEM_PROMPT = CONTEXT_DATA
if CV_TEXT:
    SYSTEM_PROMPT += (
        "\n\nDATA RESMI DARI CV/RESUME ASLI ARRAFI "
        "(SUMBER KEBENARAN UTAMA — utamakan info di bawah ini jika ada pertanyaan "
        "detail soal pengalaman, edukasi, skill, atau project):\n"
        f"{CV_TEXT}"
    )


class HistoryItem(BaseModel):
    sender: str  # "user" atau "bot"
    text: str


class ChatRequest(BaseModel):
    message: str
    history: list[HistoryItem] = []


def to_gemini_history(history: list[HistoryItem]):
    """Ubah history frontend ke format Gemini.
    Gemini mewajibkan history diawali role 'user', jadi pesan sapaan bot di awal di-skip."""
    result = []
    for item in history:
        role = "user" if item.sender == "user" else "model"
        if not result and role != "user":
            continue  # buang pesan bot/greeting yang muncul sebelum user pertama bicara
        result.append({"role": role, "parts": [item.text]})
    return result


@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    fallback = "Maaf, AI sedang istirahat. (ᴗ˳ᴗ)ᶻ𝗓𐰁"
    try:
        model = genai.GenerativeModel(
            "gemini-2.5-flash",
            system_instruction=SYSTEM_PROMPT,
        )
        chat = model.start_chat(history=to_gemini_history(req.history))
        stream = chat.send_message(req.message, stream=True)

        def generate():
            try:
                for chunk in stream:
                    if chunk.text:
                        yield chunk.text
            except Exception as e:
                print(f"🔥 STREAM ERROR: {e}")
                yield fallback

        return StreamingResponse(generate(), media_type="text/plain; charset=utf-8")
    except Exception as e:
        print(f"🔥 ERROR LOG: {e}")
        return StreamingResponse(iter([fallback]), media_type="text/plain; charset=utf-8")
