# Global .gitignore Template for All Projects

# ================================
# SABER ENTERPRISES - GLOBAL GITIGNORE
# Use this for every new project
# ================================

# Operating System Files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
desktop.ini

# IDE/Editor Files (Global)
.idea/
*.swp
*.swo
*~
.vscode/settings.json.backup

# VS Code Workspace files (keep project-specific settings)
*.code-workspace.backup

# Temporary Files
*.tmp
*.temp
temp_*
*.log
*.pid
*.seed
*.pid.lock

# Browser Cache & Storage
*.cache
*.storage

# Backup Files
*.bak
*.backup
*~
*.orig

# Dependency Directories
node_modules/
bower_components/
vendor/

# Build/Compiled Output
dist/
build/
out/
bin/
obj/
target/
*.exe
*.o
*.so
*.dylib

# Package Files
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar
*.7z

# Environment Files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.envrc

# API Keys and Secrets
secrets.json
config/secrets.yml
.secrets/

# Database Files
*.db
*.sqlite
*.sqlite3

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Runtime Data
pids/
*.pid
*.seed
*.pid.lock

# Coverage Directory
coverage/
*.lcov
.nyc_output/

# Installer Files
*.exe
*.msi
*.dmg
*.pkg
*.deb
*.rpm

# Large Media Files
*.mp4
*.avi
*.mov
*.mkv
*.wmv
*.mp3
*.wav
*.flac
*.aac
*.ogg
*.wma

# Image Files (if large)
# *.jpg
# *.jpeg
# *.png
# *.gif
# *.bmp
# *.svg
# *.webp
# *.ico

# Document Files (if not needed in repo)
# *.pdf
# *.doc
# *.docx
# *.xls
# *.xlsx
# *.ppt
# *.pptx

# Development Tools
.eslintcache
.stylelintcache
.parcel-cache/
.cache/

# Testing
.jest/
.mocha/
test-results/
coverage/

# Documentation Build
docs/build/
docs/_build/
site/

# ================================
# PROJECT-SPECIFIC ADDITIONS
# Add project-specific ignores below:
# ================================
