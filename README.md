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

Built by Chris · Phase 2 Complete

