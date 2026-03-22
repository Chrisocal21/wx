# Wx — Tech Direction

> Stack, services, and rationale. No code — direction only.

---

## Guiding Principle

Wx should cost essentially $0 to run at personal and small-public scale. Every data source is free. Every infrastructure choice is either free tier or already in Chris's stack. The architecture should be maintainable solo.

---

## Stack Overview

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + Vite + Tailwind + TypeScript | Chris's existing stack, fast hot reload, Tailwind handles the dynamic condition-based theming cleanly |
| Deployment | Vercel | Chris's default, zero config, edge CDN |
| Backend / API proxy | Cloudflare Workers | Keeps API calls server-side, handles CORS, rate limiting, data shaping |
| Database | Cloudflare D1 | Starred locations, unit prefs, user settings — lightweight SQL, free tier |
| Auth (Phase 3) | Clerk | Free tier, React components, handles multi-user saved locations for public launch |

---

## Data Sources

### Weather
**Open-Meteo**
- Free, no API key required
- Hourly + daily forecasts, current conditions
- Variables available: temperature, precipitation, wind speed/direction, UV index, feels-like, cloud cover, visibility, humidity, pressure
- Grid resolution: ~1km — excellent for neighborhood-level map overlay
- Used for: Feed screen data, all map overlay layers

### Geocoding / Location Search
**Nominatim (OpenStreetMap)**
- Free, no key
- Forward geocoding (city name → coordinates) and reverse (coordinates → city name)
- Used for: location search in the Feed, labeling map pins

### Maps
**Mapbox (free tier)**
- 50,000 map loads/month free
- Dark tile styles — matches Wx aesthetic out of the box
- Chris already uses this in maprdy
- Used for: base map on the Map screen only
- Weather overlay rendered on top using Open-Meteo grid data + canvas/WebGL layer — no Mapbox paid weather features needed

### Earthquakes
**USGS Earthquake Hazards API**
- Fully free, no key
- Real-time global earthquake feed
- Filter by magnitude, time range, coordinates + radius
- Returns: magnitude, depth, location, time, distance
- Used for: Alerts screen earthquake cards + map pins

### Fire / Thermal Data
**NASA FIRMS (Fire Information for Resource Management System)**
- Free, key required but instant approval
- Active fire detections globally, updated every few hours
- Used for: Alerts screen fire incidents, map overlay option

### Weather Alerts
**NOAA / NWS API (api.weather.gov)**
- Fully free, no key
- Official US severe weather alerts, watches, warnings
- Query by coordinates — returns active alerts for that point
- Used for: Alerts screen warning cards, Feed screen alert badge

### Air Quality
**OpenAQ**
- Free tier
- Real-time AQI by location
- Wildfire smoke PM2.5 data — critical for SoCal
- Used for: Map layer toggle, Alerts screen AQI card, Feed screen AQI indicator

---

## Map Overlay — How It Works

Rather than paying for Mapbox weather layers, Wx builds its own from Open-Meteo grid data. The approach:

1. On map load, request Open-Meteo forecast data for a grid of points covering the visible map bounds
2. Interpolate values between points into a continuous color gradient
3. Render the gradient as a transparent canvas layer on top of the Mapbox base map
4. On zoom or pan, recalculate the grid density — fewer points when zoomed out, more when zoomed in
5. Layer toggle switches which variable is visualized (precipitation, temperature, wind, UV, AQ)

This is the most technically interesting piece of the app. It's doable with HTML Canvas or a lightweight WebGL layer. No third-party weather tile service required.

---

## PWA Setup (Phase 3)

- Service worker for offline caching — last-known weather data available without connection
- Web app manifest — installable to home screen on iOS and Android
- Push notifications for severe weather alerts (NWS) — opt-in
- Offline fallback screen with last cached data timestamp

---

## Icon Strategy

Animated SVG icons only. Two candidate libraries to evaluate before deciding:

**Meteocons** (by Bas Milius)
- Open source, MIT licensed
- Animated SVG format
- Designed specifically for weather UIs
- Dark-mode ready

**Custom SVG set with CSS animation**
- Full control over style
- Animations: sun rays rotating, rain drops falling in loop, lightning flickering, snow drifting
- Higher effort but perfect aesthetic match
- Could start with Meteocons and replace with custom over time

No emoji. No PNG sprites. No Lottie (adds bundle weight for no gain over CSS-animated SVG).

---

## Phases

### Phase 1 — MVP
- Feed screen only
- Current location via browser geolocation
- Open-Meteo data: current conditions, hourly, 7-day
- Condition-reactive background system
- °F / °C toggle
- Animated SVG icons
- Vercel deploy — works in mobile browser

### Phase 2 — Full Wx
- Starred locations with drag reorder
- Location search via Nominatim
- Map screen with Open-Meteo overlay, all layer toggles
- Alerts screen: USGS + NWS + NASA FIRMS + OpenAQ
- Local ↔ National toggle on Alerts
- Cloudflare D1 for persisting user preferences
- Air quality + wildfire smoke mode

### Phase 3 — PWA + Public
- Full PWA: installable, offline support, push notifications
- User accounts via Clerk
- Saved locations synced across devices
- Public launch
- Share a location's weather as a live card link

---

## Cost Estimate at Scale

| Service | Free Limit | Expected Usage |
|---|---|---|
| Open-Meteo | Unlimited (fair use) | Well within limits |
| Mapbox | 50k map loads/mo | Fine for personal + small public |
| USGS | Unlimited | No limits |
| NASA FIRMS | Free with key | Well within limits |
| NOAA / NWS | Unlimited | No limits |
| OpenAQ | Free tier | Fine for personal use |
| Vercel | Generous free tier | Fine for MVP + beta |
| Cloudflare Workers + D1 | Free tier | Fine for personal + small public |

**Projected monthly cost at MVP: $0**
**Projected monthly cost at small public launch: $0–$5**
