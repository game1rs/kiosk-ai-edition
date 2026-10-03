@echo off
title KIOSK - Night Window
cd /d "%~dp0"
echo ==========================================
echo   KIOSK - installing / starting game...
echo ==========================================
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install it from https://nodejs.org/
  pause
  exit /b 1
)
if not exist node_modules call npm install
call npm run dev -- --host 0.0.0.0
pause
