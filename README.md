# Wx

> Weather, without the noise.

A clean, beautiful, ad-free weather app built with React, Vite, and Tailwind CSS.

## Features

### Phase 1 — MVP (Current)
- 🌡️ Current conditions with real-time temperature
- 📍 Automatic location detection
- ⏰ Hourly forecast strip
- 📅 7-day forecast
- 🎨 Condition-reactive backgrounds (clear/cloudy/rain/storm/sunrise/sunset)
- 🌡️ °F / °C toggle
- 📱 Mobile-first responsive design
- ⚡ Animated SVG weather icons

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

The app will be available at `http://localhost:5173`

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
- **Icons**: [Meteocons](https://github.com/basmilius/weather-icons) by Bas Milius

## Roadmap

See [FEATURE_MAP.md](./FEATURE_MAP.md) for the complete feature roadmap.

## License

Personal project — not currently open source.

---

Built by Chris · Phase 1 MVP
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
