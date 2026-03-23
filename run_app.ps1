Write-Host "Starting JalRaksha Servers..." -ForegroundColor Cyan

# Start Backend in background
Start-Process powershell -ArgumentList "-NoExit -Command `"cd backend; .\venv\Scripts\Activate.ps1; uvicorn main:app --reload`"" -WindowStyle Normal

# Start Frontend in background
Start-Process powershell -ArgumentList "-NoExit -Command `"cd frontend; npm run dev`"" -WindowStyle Normal

Write-Host "Servers are starting in new windows." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173"
Write-Host "Backend API: http://localhost:8000"
