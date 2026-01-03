# Save-Sense AI - Complete Setup Guide

A full-stack financial savings and investment management application built for Pakistani students and young professionals.

##  Project Structure

```
Save-Sense AI/
├── backend/              # FastAPI Python server
│   ├── main.py          # Main application file
│   ├── requirements.txt  # Python dependencies
│   └── venv/            # Virtual environment
├── src/                 # React TypeScript frontend
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── package.json         # Node dependencies
└── vite.config.ts       # Vite configuration
```

##  Quick Start (5 Minutes)

### Prerequisites
- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **Python 3.8+** - [Download](https://python.org/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone & Navigate
```bash
cd "C:\Users\HP\OneDrive\Desktop\Data Structure Project\DS Project By Team Avalon\Save-Sense AI"
```

### Step 2: Setup Backend (Terminal 1)
```bash
# Navigate to backend
cd backend

# Create virtual environment (first time only)
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
```
Backend will be available at `http://localhost:8000`

### Step 3: Setup Frontend (Terminal 2)
```bash
# From root directory
npm install

# Run development server
npm run dev
```
Frontend will be available at `http://localhost:5173` or `http://localhost:5174`

**Run both terminals simultaneously!** 🎬

---

##  Application Features

### Pages & Components
- **Daily Tracker** (`/tracker`) - Track daily savings with interactive calendar
- **AI Assistant** (`/ai-assistant`) - Get personalized financial advice
- **Banking Options** (`/banking`) - Compare Pakistani banks and savings rates
- **Investment Guide** (`/investment`) - Smart investment tips with detailed modals
- **Products/Goals** (`/products`) - Manage multiple savings goals
- **Transactions** (`/transactions`) - Track income, expenses, and savings

### Key Components
-  **Smart Investment Tips** - Clickable cards with detailed modals
-  **Progress Tracking** - Visual progress circles and monthly summaries
-  **Savings Calculator** - Automatic calculation of returns
-  **Neumorphic UI** - Beautiful modern design with dark mode support
-  **Responsive Design** - Works perfectly on mobile and desktop

---

## Backend Configuration

### Environment Variables
Create a `.env` file in the `backend/` folder:

```
GEMINI_API_KEY=your_api_key_here
```

Get your API key from: https://aistudio.google.com/app/apikey

### Available Endpoints
- `GET /api/investments` - Get all investments
- `GET /api/banks` - Get bank information
- `GET /api/savings/{user_id}` - Get user savings
- `POST /api/advisor` - AI financial advice
- `POST /api/contact` - Contact form submission

---

## Dependencies

### Frontend (React + TypeScript)
- **Vite** - Lightning fast build tool
- **React Router** - Client-side routing
- **Shadcn UI** - High-quality UI components
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Beautiful SVG icons
- **React Hook Form** - Form management

### Backend (Python)
- **FastAPI** - Modern async web framework
- **Pydantic** - Data validation
- **Google Generative AI** - AI advisor
- **uvicorn** - ASGI server
- **python-dotenv** - Environment variables

---

## Styling & Theming

### Neumorphic Design
The app features a custom neumorphic design system:
```css
.neumorphic {
  background: linear-gradient(145deg, #f0f4f8, #e6eaee);
  box-shadow: 8px 8px 16px rgba(...), -8px -8px 16px rgba(...);
}
```

### Dark Mode
Automatically toggles based on system preference or user selection:
- Dark theme using Tailwind's dark mode
- Smooth transitions between themes
- Persistent preference in localStorage

---

## Build & Deployment

### Build for Production
```bash
# Frontend
npm run build

# Creates optimized files in dist/
```

### Preview Production Build
```bash
npm run preview
```

---

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use 5174, 5175, etc.

### Backend Connection Error
- Ensure FastAPI is running on `http://localhost:8000`
- Check backend terminal for error messages
- Verify Python version: `python --version`

### Missing Dependencies
```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

### Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Clear node_modules
rm -r node_modules
npm install
```

---

## Project Architecture

### Frontend Structure
```
src/
├── pages/           # Full page components
├── components/      # Reusable UI components
│   └── ui/         # Shadcn UI primitives
├── hooks/          # Custom React hooks
└── lib/            # Utilities (cn(), etc.)
```

### Component Hierarchy
```
App
├── Navbar (Navigation)
├── Pages
│   ├── Index (Daily Tracker)
│   ├── Investment (Investment Guide)
│   ├── Banking (Banking Options)
│   ├── AIAssistant (AI Chat)
│   └── Portal (Login/Register)
└── UI Components
    ├── Cards (Progress, Summary)
    ├── Calendar (Savings Calendar)
    └── Dialogs (Investment Details)
```

---

## Performance Tips

### Optimize Images
- All images should be optimized before deployment
- Use WebP format for better compression

### Code Splitting
- Vite automatically code-splits components
- Lazy load heavy components with React.lazy()

### Database
- Consider adding a database (MongoDB, PostgreSQL) for production
- Current setup uses localStorage for client-side data

---

## Mobile Optimization

The app is fully responsive with:
- Mobile-first design approach
- Touch-friendly buttons and inputs
- Optimized images for different screen sizes
- Bottom navigation for mobile users

---

## Security Notes

### Current Security
- LocalStorage for user data (browser-based)
- HTTPS recommended for production
- API key stored in backend .env file

### Production Recommendations
- Add authentication (JWT tokens)
- Implement CORS properly
- Use HTTPS only
- Validate all user inputs
- Add rate limiting

---

## License

© 2026 Save-Sense AI by Team Avalon. All rights reserved.

---

## Support

For issues or questions:
1. Check the GitHub issues
2. Contact: ghullamq916@gmail.com
3. Check troubleshooting section above

---

**Ready to start?** Run the Quick Start section above! 



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