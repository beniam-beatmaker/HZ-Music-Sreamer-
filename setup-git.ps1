# Hertz Website - Git Setup PowerShell Script

Write-Host "========================================"
Write-Host "   Hertz Website - Git Setup Script"
Write-Host "========================================"
Write-Host ""

# Check if Git is installed
Write-Host "Checking if Git is installed..." -ForegroundColor Yellow

try {
    $gitVersion = git --version 2>$null
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR: Git is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host "2. Download and install Git for Windows" -ForegroundColor Cyan
    Write-Host "3. Restart PowerShell and run this script again" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Initialize Git repository
Write-Host "🔧 Initializing Git repository..." -ForegroundColor Yellow
git init

# Configure Git
Write-Host "⚙️ Setting up Git configuration..." -ForegroundColor Yellow
git config user.name "Saber Enterprises"
git config user.email "your-email@example.com"

# Add all files to staging
Write-Host "📁 Adding files to Git..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
$commitMessage = @"
Initial commit: Hertz Music Streaming Website

- Complete music streaming web application
- Online and offline playback capabilities  
- Playlist and favorites management
- Modern dark theme with responsive design
- Advanced storage with multiple backup methods
- Cross-platform browser support

Features:
✅ Offline Mode with permanent storage
✅ Online streaming capabilities
✅ Playlist management
✅ Favorites and liked songs
✅ Advanced audio player
✅ Responsive mobile design
✅ Cross-tab synchronization
✅ Multiple storage backup methods
"@

git commit -m $commitMessage

Write-Host ""
Write-Host "========================================"
Write-Host "🎉 Git repository setup complete!" -ForegroundColor Green
Write-Host "========================================"
Write-Host ""

Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Create a GitHub repository" -ForegroundColor Cyan
Write-Host "2. Add remote: git remote add origin https://github.com/yourusername/hertz-website.git" -ForegroundColor Cyan
Write-Host "3. Push code: git push -u origin main" -ForegroundColor Cyan
Write-Host ""

Write-Host "📊 Repository status:" -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "🔗 To connect to GitHub:" -ForegroundColor Yellow
Write-Host "git remote add origin <your-github-repo-url>" -ForegroundColor Cyan
Write-Host "git branch -M main" -ForegroundColor Cyan
Write-Host "git push -u origin main" -ForegroundColor Cyan

Write-Host ""
Write-Host "✅ Repository is ready for version control!" -ForegroundColor Green
Read-Host "Press Enter to exit"
