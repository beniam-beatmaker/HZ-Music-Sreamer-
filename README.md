# HZ Music Streaming Website

A modern, feature-rich music streaming web application with offline capabilities, playlist management, and a beautiful dark theme interface.

## 🎵 Features

### Core Functionality
- **Online Streaming** - Stream music from various sources
- **Offline Mode** - Upload and play local audio files with permanent storage
- **Playlists** - Create, manage, and organize your music collections
- **Favorites** - Mark and access your favorite tracks quickly
- **Liked Songs** - Heart songs and build your liked collection
- **Search** - Find tracks across all your music sources

### Player Features
- **Advanced Audio Player** - Full-featured music player with controls
- **Progress Tracking** - Visual progress bar with time display
- **Volume Control** - Adjustable volume with visual feedback
- **Shuffle & Repeat** - Randomize playback or loop tracks
- **Cross-Platform** - Works on desktop and mobile devices

### Storage & Sync
- **Permanent Storage** - Multiple backup methods ensure data persistence
- **Cross-Tab Sync** - Changes sync across browser tabs
- **IndexedDB Support** - Advanced browser storage for large audio files
- **LocalStorage Backup** - Multiple redundant storage locations

### UI/UX
- **Dark Theme** - Modern dark interface with Spotify-inspired design
- **Responsive Design** - Mobile-friendly with adaptive layouts
- **Smooth Animations** - Polished transitions and interactions
- **Status Notifications** - Real-time feedback for user actions

## 📁 Project Structure

```
Hertz Website/
├── index.html              # Main homepage
├── Online App.html          # Online streaming interface
├── Offline App.html         # Local file upload and playback
├── Playlist App.html        # Playlist management
├── Liked App.html           # Liked songs collection
├── Favorites App.html       # Favorites management
├── Account App.html         # User account settings
├── Settings App.html        # Application settings
├── online.html             # Online streaming (legacy)
├── offline.html            # Offline mode (legacy)
├── playlists.html          # Playlists (legacy)
├── liked.html              # Liked songs (legacy)
├── favorites.html          # Favorites (legacy)
├── Account.html            # Account (legacy)
├── settings.html           # Settings (legacy)
├── playlist-view.html      # Individual playlist view
├── playlist-view-new.html  # Enhanced playlist view
├── clear-storage.html      # Storage management utility
└── temp_clear.js           # Temporary storage clearing script
```

## 🚀 Getting Started

1. **Clone or Download** this repository
2. **Open** any HTML file in a modern web browser
3. **Start** with `index.html` for the main interface
4. **Upload** your music files in the Offline section
5. **Enjoy** your personalized music streaming experience!

## 🎯 Main Applications

### Hertz App.html
The comprehensive all-in-one music application combining all features.

### Offline App.html
- Upload local audio files (MP3, WAV, FLAC, etc.)
- Permanent storage with multiple backup methods
- Search and organize your offline collection
- Full playback controls with shuffle and repeat

### Online App.html
- Stream music from online sources
- Search and discover new tracks
- Integration with online music services

### Playlist App.html
- Create custom playlists
- Drag-and-drop organization
- Share and manage collections

## 💾 Storage Technology

The application uses advanced storage techniques:
- **Primary Storage**: localStorage for immediate access
- **Backup Storage**: Multiple localStorage keys for redundancy
- **IndexedDB**: For large audio file storage
- **Base64 Encoding**: Ensures audio files are permanently stored
- **Cross-Tab Sync**: Real-time updates across browser tabs

## 🎨 Design

- **Color Scheme**: Dark theme with Spotify-inspired green accents (#1db954)
- **Typography**: Segoe UI for clean, modern text
- **Layout**: Responsive grid with mobile-first approach
- **Animations**: Smooth transitions and hover effects

## 🔧 Technical Details

- **Pure HTML/CSS/JavaScript** - No external dependencies
- **ES6+** - Modern JavaScript features
- **Responsive Design** - CSS Grid and Flexbox
- **Local Storage** - Browser-based data persistence
- **File API** - Direct audio file handling
- **Web Audio API** - Enhanced audio playback

## 📱 Browser Support

- **Chrome/Chromium** - Full support
- **Firefox** - Full support  
- **Safari** - Full support
- **Edge** - Full support
- **Mobile Browsers** - Responsive design

## 🛠 Development

### Adding New Features
1. Follow the existing code structure
2. Use the established storage patterns
3. Maintain responsive design principles
4. Test across different browsers

### Storage Management
- Use the "Test Storage" button to debug storage issues
- Multiple backup methods ensure data persistence
- Clear storage utility available for testing

## 📄 License

This project is for personal/educational use. Music streaming capabilities should comply with applicable copyright laws and terms of service.

## 🎵 Enjoy Your Music!

Hertz provides a complete music streaming experience with both online and offline capabilities. Upload your music, create playlists, and enjoy high-quality audio playback with a beautiful, modern interface.

---

**Version**: 4.0  
**Last Updated**: July 2025  
**Author**: Saber Enterprises
