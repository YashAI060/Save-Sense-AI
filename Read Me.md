# Save-Sense AI: Run Project

## Quick Start

### Backend (FastAPI)
1. Navigate to backend folder: `cd backend`
2. Activate virtual environment: `venv\Scripts\activate` (Windows)
3. Install dependencies: `pip install -r requirements.txt`
4. Run server: `uvicorn main:app --reload`
   - Available at `http://localhost:8000`

### Frontend (React + Vite)
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
   - Available at `http://localhost:5173`

Run both terminals simultaneously for full project.







# What I Did:
# 1. Started the Backend (FastAPI)

Navigated to the backend/ folder
Activated the Python virtual environment
Ran uvicorn main:app --reload on port 8000
This serves the API endpoints for the Save-Sense AI backend

# 2. Started the Frontend (React + Vite)

Navigated to the root project folder
Ran npm run dev on port 5173
This serves the React frontend with hot module reloading

# 3. Opened the Preview

The Simple Browser is now displaying the application at http://localhost:5173


# Project Summary:
Save-Sense AI is a full-stack savings and investment management application with:

Frontend: React + TypeScript with Vite (fast build tool)
Backend: FastAPI (Python)
UI Components: Shadcn UI components for a polished interface
Features: Savings tracking, daily setups, progress visualization, investment options, AI assistant, calendar views, and transaction management

Both servers are now running and the application is accessible. You can interact with the frontend, and API requests will be routed to the backend FastAPI server at http://localhost:8000.