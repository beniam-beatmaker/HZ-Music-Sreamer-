@echo off
title Saber Enterprises - Universal Git Setup

echo ================================================
echo 🚀 SABER ENTERPRISES - QUICK GIT SETUP
echo ================================================
echo.

REM Check if Git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Git not found! Please install Git first.
    pause
    exit /b 1
)

echo ✅ Git is available!
echo.

REM Get project name from current directory
for %%I in (.) do set PROJECT_NAME=%%~nxI

echo 📁 Project: %PROJECT_NAME%
echo 🔧 Initializing Git repository...

REM Initialize repository
git init
git config user.name "Saber Enterprises"
git config user.email "saber.enterprises.dev@gmail.com"

REM Create basic .gitignore
echo # %PROJECT_NAME% - Git Ignore > .gitignore
echo. >> .gitignore
echo # System Files >> .gitignore
echo .DS_Store >> .gitignore
echo Thumbs.db >> .gitignore
echo *.tmp >> .gitignore
echo *.log >> .gitignore
echo node_modules/ >> .gitignore
echo dist/ >> .gitignore
echo build/ >> .gitignore
echo *.exe >> .gitignore

REM Create README
echo # %PROJECT_NAME% > README.md
echo. >> README.md
echo New project by Saber Enterprises >> README.md
echo. >> README.md
echo ## Features >> README.md
echo - Professional Git setup >> README.md
echo - VS Code optimized >> README.md
echo - Ready for development >> README.md

REM Add and commit
git add .
git commit -m "Initial commit: %PROJECT_NAME%"
git branch -M main

echo.
echo ✅ Git setup complete!
echo 📊 Repository status:
git status --short

echo.
echo 🔗 Next: Connect to GitHub and push!
echo.
pause
