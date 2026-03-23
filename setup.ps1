Write-Host "Setting up JalRaksha..." -ForegroundColor Cyan

Write-Host "1. Setting up Python Backend" -ForegroundColor Yellow
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python ml/train_dummy_models.py
cd ..

Write-Host "2. Setting up React Frontend" -ForegroundColor Yellow
cd frontend
npm install
cd ..

Write-Host "Setup Complete! Run .\run_app.ps1 to start the servers." -ForegroundColor Green
