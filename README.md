# Wx

> Weather, without the noise.

A clean, beautiful, ad-free weather app built with React, Vite, and Tailwind CSS.

## Features

### Phase 1 — MVP ✅
- 🌡️ Current conditions with real-time temperature
- 📍 Automatic location detection with reverse geocoding
- ⏰ Hourly forecast strip with current hour highlight
- 📅 7-day forecast
- 🎨 Condition-reactive backgrounds (clear/cloudy/rain/storm/sunrise/sunset)
- 🌡️ °F / °C toggle
- 📱 Mobile-first responsive design
- ⚡ Animated SVG weather icons
- 🌅 UV index, visibility, sunrise/sunset times

### Phase 2 — Locations & Search ✅
- 🔍 City search with autocomplete
- ⭐ Star favorite locations
- 📌 Multiple saved locations
- 🔄 Quick location switching
- 💾 Persistent storage (localStorage)
- 🏙️ Shows city, state/province, and country
- 🕐 Local time display for each location

### Phase 3 — PWA & Polish ✅
- 📲 Progressive Web App (installable)
- 💨 Offline support with service worker
- ⚡ Loading skeleton screens
- 🎯 Improved error handling
- 📥 Install prompt for mobile/desktop
- 🎨 Smooth animations and transitions

### Enhancements ✅
- 🧭 Wind direction compass visualization
- ⌨️ Keyboard shortcuts (/ for search, u for units, l for locations, Esc to close)
- 🔄 Pull-to-refresh on mobile
- 🔢 Properly formatted numbers with thousand separators
- 🔍 SEO meta tags with Open Graph and Twitter Card support

## Tech Stack

- **Frontend**: React + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **API**: Open-Meteo (free, no key required)
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## Deployment

The app is deployed on [Vercel](https://vercel.com) with automatic deployments from the main branch.

### Deploy Your Own

1. Push your code to GitHub
2. Import the project to Vercel
3. Vercel will automatically detect Vite and configure the build
4. Your app will be live with PWA support, automatic HTTPS, and global CDN

The PWA will automatically work on Vercel with:
- Service worker for offline caching
- Install prompts on supported browsers
- Automatic HTTPS (required for PWA features)

## Project Structure

```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── services/       # API services (Open-Meteo)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── styles/         # Additional CSS/styling
```

## Data Sources

- **Weather Data**: [Open-Meteo](https://open-meteo.com/) - Free weather API
- **Geocoding**: [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) - City search
- **Reverse Geocoding**: [BigDataCloud](https://www.bigdatacloud.com/) - Location name from coordinates
- **Icons**: Custom SVG weather icons

## License

Personal project — not currently open source.

---

Built by Chris · Enhanced & Production-Ready

