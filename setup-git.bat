@echo off
echo ========================================
echo    Hertz Website - Git Setup Script
echo ========================================
echo.

echo Checking if Git is installed...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Go to: https://git-scm.com/download/win
    echo 2. Download and install Git for Windows
    echo 3. Restart this script after installation
    echo.
    pause
    exit /b 1
)

echo Git is installed! Setting up repository...
echo.

REM Initialize Git repository
echo Initializing Git repository...
git init

REM Configure Git (you can change these)
echo Setting up Git configuration...
git config user.name "Saber Enterprises"
git config user.email "your-email@example.com"

REM Add all files to staging
echo Adding files to Git...
git add .

REM Create initial commit
echo Creating initial commit...
git commit -m "Initial commit: Hertz Music Streaming Website

- Complete music streaming web application
- Online and offline playback capabilities  
- Playlist and favorites management
- Modern dark theme with responsive design
- Advanced storage with multiple backup methods
- Cross-platform browser support"

echo.
echo ========================================
echo Git repository setup complete!
echo ========================================
echo.
echo Next steps:
echo 1. Create a GitHub repository
echo 2. Add remote: git remote add origin https://github.com/yourusername/hertz-website.git
echo 3. Push code: git push -u origin main
echo.
echo Repository is ready for version control!
pause
