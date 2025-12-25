from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv
from pathlib import Path

# --- Setup & API Key Load ---
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("⚠️ Error: API Key nahi mili! .env file check karo.")
else:
    # Key mein agar koi extra space ya quotes hain to clean karo
    api_key = api_key.strip().replace('"', '').replace("'", "")
    print(f"✅ API Key Loaded Successfully! (Length: {len(api_key)})")
    genai.configure(api_key=api_key)

    # --- DEBUG: Available Models List Karo ---
    print("\n🔍 Checking Available Google Models...")
    try:
        available_models = []
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"   👉 Found: {m.name}")
                available_models.append(m.name)
        if not available_models:
            print("⚠️ Warning: List khali aayi. API Key valid hai par shayad permissions missing hain.")
    except Exception as e:
        print(f"❌ Connection Error: {e}")
    print("------------------------------------------\n")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AIQuery(BaseModel):
    question: str

@app.post("/api/advisor")
def finance_advisor(query: AIQuery):
    if not api_key:
        return {"response": "Server Error: API Key missing."}
    
    try:
        # Hum 'gemini-1.5-flash' use karenge jo sabse latest aur fast hai
        # (Agar ye fail hua to terminal ki list dekh kar naam change karenge)
        model = genai.GenerativeModel('gemini-flash-latest')
        
        prompt = f"""
        Act as 'PakSaver AI', a financial advisor for Pakistani students.
        Question: {query.question}
        Reply in concise Hinglish (Roman Urdu) with PKR currency context.
        """
        
        response = model.generate_content(prompt)
        return {"response": response.text}
    
    except Exception as e:
        return {"response": f"AI Error: {str(e)}"}

@app.get("/api/banks")
def get_bank_rates():
    return [
        {"name": "Meezan Bank", "rate": "18% (Halal)", "type": "Islamic"},
        {"name": "HBL", "rate": "20.5%", "type": "Conventional"},
        {"name": "EasyPaisa", "rate": "15%", "type": "Wallet"}
    ]