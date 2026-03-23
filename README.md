# JalRaksha – AI-Powered Water-Borne Disease Early Warning System

JalRaksha is a scalable, real-time disease surveillance system designed for rural India. It allows ASHA workers to input environmental and symptom data which is processed by a Machine Learning engine to predict potential disease outbreaks, assess risk levels, and estimate symptom counts.

## Tech Stack
-   **Frontend:** React.js, Vite, Tailwind CSS, Leaflet.js
-   **Backend:** Python, FastAPI, Uvicorn
-   **Machine Learning:** Scikit-learn (RandomForestClassifier, RandomForestRegressor, StandardScaler, LabelEncoder), Joblib

## Features Structure Overview
```
JalRaksha/
│
├── backend/                  # FastAPI Application
│   ├── main.py               # Application entry point
│   ├── requirements.txt      # Python dependencies
│   ├── ml/
│   │   ├── train_dummy_models.py # Script to generate and save Scikit-learn models
│   │   ├── model_loader.py       # Joblib model loader singleton
│   │   └── preprocess.py         # Data preprocessing matching model expectations
│   ├── models/
│   │   └── schemas.py            # Pydantic schemas
│   └── routes/
│       ├── predict.py            # ML Prediction endpoint
│       └── history.py            # Simulated database route
│
└── frontend/                 # React Application
    ├── package.json          # Node dependencies
    ├── tailwind.config.js    # Styling config
    └── src/
        ├── App.jsx           # React Router
        ├── components/Layout.jsx   # Global Layout & NavBar
        ├── pages/
        │   ├── AshaWorkerForm.jsx  # Input form for field workers
        │   └── Dashboard.jsx       # Leaflet Map Dashboard for DHO
        └── services/api.js         # API integration with offline support mock
```

## Quick Start Setup

Use the included helper script to setup both backend and frontend environments:

### 1. Initial Setup
Run the `setup.ps1` script (or manually follow the steps below):
```powershell
.\setup.ps1
```

**Manual Setup:**
**Backend Setup:**
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # (Windows)
pip install -r requirements.txt
python ml/train_dummy_models.py
```

**Frontend Setup:**
```bash
cd frontend
npm install
```

### 2. Running the Application
Run the frontend and backend servers using the helper script:
```powershell
.\run_app.ps1
```

**Alternative Manual Run:**
Backend (runs on `http://localhost:8000`):
```bash
cd backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

Frontend (runs on `http://localhost:5173`):
```bash
cd frontend
npm run dev
```

## Features Deep-Dive
-   **ASHA Worker Module:** A 3-step form handling demographic, water quality, and symptom data. Simulates an offline queue mechanism using `localStorage` when no network connection is available.
-   **DHO Dashboard:** Uses `react-leaflet` to visualize predicted outbreaks dynamically with color-coordinated risk markers over a geographical map.
-   **ML Prediction Engine:** Preloads simulated Random Forest estimators to rapidly issue categorical disease risks and regress expected regional cases.
