# Git Setup and Workflow Guide for Hertz Website

## 🚀 Quick Setup (After Installing Git)

### 1. Install Git
- Download from: https://git-scm.com/download/win
- Run installer with default settings
- Restart terminal/VS Code

### 2. Initialize Repository
Run the setup script:
```bash
# Option 1: PowerShell (Recommended)
.\setup-git.ps1

# Option 2: Batch file
.\setup-git.bat

# Option 3: Manual commands
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add .
git commit -m "Initial commit: Hertz Music Streaming Website"
```

## 📡 Connect to GitHub

### 1. Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `hertz-website`
3. Description: `Modern music streaming web application`
4. Set to Public or Private
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 2. Connect Local Repository
```bash
git remote add origin https://github.com/yourusername/hertz-website.git
git branch -M main
git push -u origin main
```

## 🔄 Daily Git Workflow

### Making Changes
```bash
# Check status
git status

# Add specific files
git add "Offline App.html"
git add "README.md"

# Or add all changes
git add .

# Commit with descriptive message
git commit -m "feat: Enhanced offline player with better storage"

# Push to GitHub
git push
```

### Common Commands
```bash
# View commit history
git log --oneline

# See what changed
git diff

# Check current branch
git branch

# Create new branch for features
git checkout -b feature/new-player-controls

# Switch back to main
git checkout main

# Merge feature branch
git merge feature/new-player-controls
```

## 📝 Commit Message Guidelines

### Format
```
type: description

body (optional)
```

### Types
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` UI/styling changes
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

### Examples
```bash
git commit -m "feat: Add shuffle and repeat functionality to player"
git commit -m "fix: Resolve audio playback issues on mobile devices"
git commit -m "style: Update dark theme colors and improve responsiveness"
git commit -m "docs: Update README with new features and setup instructions"
```

## 🌿 Branching Strategy

### Main Branches
- `main` - Production-ready code
- `develop` - Integration branch for features

### Feature Branches
```bash
# Create feature branch
git checkout -b feature/playlist-management
git checkout -b feature/mobile-optimization
git checkout -b fix/storage-sync-issues

# Work on feature...
git add .
git commit -m "feat: Add playlist creation functionality"

# Push feature branch
git push -u origin feature/playlist-management

# Create Pull Request on GitHub
# After review and merge, delete branch
git checkout main
git pull
git branch -d feature/playlist-management
```

## 🔧 Useful Git Configurations

```bash
# Set default editor
git config --global core.editor "code --wait"

# Set up aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph --all"

# Set up line ending handling (Windows)
git config --global core.autocrlf true

# Cache credentials
git config --global credential.helper manager-core
```

## 🚫 What to Ignore (.gitignore)

The `.gitignore` file already includes:
- System files (Thumbs.db, .DS_Store)
- Editor files (.vscode/, .idea/)
- Temporary files (*.tmp, *.log)
- Large media files (*.mp3, *.mp4)
- Build artifacts
- Environment files

## 📊 GitHub Features to Use

### 1. Issues
- Track bugs and feature requests
- Use labels: `bug`, `enhancement`, `documentation`
- Assign to team members

### 2. Pull Requests
- Code review process
- Automated testing (if set up)
- Discussion and collaboration

### 3. Releases
- Tag stable versions
- Include release notes
- Attach distribution files

### 4. GitHub Pages
- Host your website directly from repository
- Enable in Settings > Pages
- Use `main` branch or `docs` folder

## 🔄 Sync with Remote

```bash
# Get latest changes
git pull

# If you have conflicts
git status  # Check conflicted files
# Edit files to resolve conflicts
git add .
git commit -m "resolve: Merge conflicts in player controls"

# Force push (use carefully)
git push --force-with-lease
```

## 🆘 Common Issues and Solutions

### Undo Last Commit
```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Undo commit and discard changes
git reset --hard HEAD~1
```

### Remove File from Git (keep local)
```bash
git rm --cached "filename.html"
```

### Change Last Commit Message
```bash
git commit --amend -m "New commit message"
```

### Stash Changes
```bash
# Save current work
git stash

# Apply stashed changes
git stash pop
```

## 🎯 Project-Specific Workflow

For the Hertz Website project:

1. **Feature Development**: Create branches for new features
2. **Bug Fixes**: Create hotfix branches from main
3. **Releases**: Tag versions when releasing new features
4. **Documentation**: Update README.md with new features

### Example Workflow
```bash
# Start new feature
git checkout main
git pull
git checkout -b feature/advanced-equalizer

# Develop feature
# Edit files...
git add .
git commit -m "feat: Add 10-band equalizer to audio player"

# Push and create PR
git push -u origin feature/advanced-equalizer
# Create Pull Request on GitHub

# After merge
git checkout main
git pull
git branch -d feature/advanced-equalizer
```

## 🌐 Deployment

### GitHub Pages Setup
1. Go to repository Settings
2. Scroll to "Pages" section
3. Select source: "Deploy from branch"
4. Choose `main` branch
5. Your site will be available at: `https://yourusername.github.io/hertz-website`

### Custom Domain (Optional)
1. Add CNAME file with your domain
2. Configure DNS settings
3. Enable HTTPS in GitHub Pages settings

---

**Ready to start? Run the setup script and begin your Git journey!** 🚀
