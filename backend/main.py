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
        # Use gemini-2.0-flash-exp which is available
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""
        Act as 'Save Sense AI', a highly intelligent and friendly financial advisor specifically for Pakistani students and young professionals.
        
        Context:
        - User is asking: {query.question}
        - Currency: PKR (Pakistani Rupee)
        - Target Audience: Students (low income, high potential)
        
        Instructions:
        1. Reply in natural, conversational Hinglish (Roman Urdu) - the way Pakistani students talk.
        2. Be extremely helpful, practical, and provide specific financial advice.
        3. If they ask about banks, mention Pakistani banks like Meezan, HBL, Alfalah, or digital wallets like SadaPay, NayaPay, EasyPaisa.
        4. Keep the tone encouraging but professional.
        5. Use bullet points for lists to make it readable.
        6. Avoid overly technical jargon; explain things simply.
        
        Your name is 'Save Sense AI'. Start by addressing the user's specific concern.
        """
        
        response = model.generate_content(prompt)
        if response and response.text:
            return {"response": response.text}
        else:
            return {"response": "I'm sorry, I couldn't process that. Please try asking again in a different way."}
    
    except Exception as e:
        return {"response": f"AI Error: {str(e)}"}

@app.get("/api/banks")
def get_bank_rates():
    return [
        {"name": "Meezan Bank", "rate": "18% (Halal)", "type": "Islamic", "description": "Best for Islamic savings accounts with monthly profit distribution."},
        {"name": "HBL", "rate": "20.5%", "type": "Conventional", "description": "Leading bank with high-yield saving certificates and digital banking."},
        {"name": "EasyPaisa", "rate": "15%", "type": "Wallet", "description": "Convenient for students, instant profit on daily balance."},
        {"name": "Bank Alfalah", "rate": "19%", "type": "Conventional", "description": "Great for car financing and personal loans with competitive rates."},
        {"name": "MCB", "rate": "17.5%", "type": "Conventional", "description": "Trusted bank for long-term savings and fixed deposits."}
    ]

@app.get("/api/investments")
def get_investment_options():
    return [
        {
            "name": "Mutual Funds",
            "risk": "Moderate",
            "return": "15-22%",
            "minimum_amount": "PKR 5,000",
            "duration": "1-3 years",
            "liquidity": "Moderate",
            "description": "Professionally managed funds investing in stocks and bonds. Ideal for 1-3 years. Tip: Start with equity savings funds for balanced growth. Consult a financial advisor before investing."
        },
        {
            "name": "Pakistan Stock Exchange (PSX)",
            "risk": "High",
            "return": "Variable (can be 30%+)",
            "minimum_amount": "PKR 500 per share",
            "duration": "Short to Long-term",
            "liquidity": "High",
            "description": "Directly buy shares of companies like Engro, Lucky Cement, etc. Tip: Research company fundamentals and diversify your portfolio. Use apps like PSX mobile for trading."
        },
        {
            "name": "Gold",
            "risk": "Low/Moderate",
            "return": "Hedge against inflation",
            "minimum_amount": "PKR 1,000",
            "duration": "Long-term",
            "liquidity": "High",
            "description": "Classic investment to protect your money from PKR devaluation. Tip: Invest in gold ETFs or physical gold through banks. It's a safe haven during economic uncertainty."
        },
        {
            "name": "National Savings (Behbood)",
            "risk": "Very Low",
            "return": "16-18%",
            "minimum_amount": "PKR 100",
            "duration": "1-5 years",
            "liquidity": "Low",
            "description": "Government backed certificates, very safe but limited for students. Tip: Best for risk-averse investors. Check maturity dates and tax implications."
        },
        {
            "name": "Real Estate (REITs)",
            "risk": "Moderate",
            "return": "12-18%",
            "minimum_amount": "PKR 10,000",
            "duration": "3-5 years",
            "liquidity": "Low",
            "description": "Invest in large real estate projects with small amounts through REITs. Tip: Look for REITs listed on PSX. Provides rental income and capital appreciation."
        }
    ]

# In-memory storage for savings data (in production, use a database)
savings_data = {}
users_data = {}  # Store user_id -> full_name mapping

@app.post("/api/register")
def register_user(data: dict):
    """Register a new user with name and unique_id"""
    unique_id = data.get("unique_id")
    full_name = data.get("full_name")
    if unique_id and full_name:
        users_data[unique_id] = full_name
        return {"success": True, "message": "User registered successfully"}
    return {"success": False, "message": "Missing data"}

@app.post("/api/verify")
def verify_user(data: dict):
    """Verify returning user credentials"""
    unique_id = data.get("unique_id")
    full_name = data.get("full_name")
    
    if unique_id not in users_data:
        return {"success": False, "message": "User ID not found. Please create a new account."}
    
    stored_name = users_data[unique_id]
    if stored_name.lower() == full_name.lower():
        return {"success": True, "message": "Credentials verified"}
    else:
        return {"success": False, "message": "Name does not match. Please enter the correct First and Last name."}

@app.get("/api/savings/{user_id}")
def get_savings(user_id: str):
    """Get savings data for a user"""
    return {"savings": savings_data.get(user_id, {})}

@app.post("/api/savings/{user_id}")
def save_savings(user_id: str, data: dict):
    """Save savings data for a user"""
    savings_data[user_id] = data.get("savings", {})
    return {"message": "Savings data saved successfully"}
