# Wx — Feature Map

> Features by phase. Phase 1 is the MVP. Each phase builds on the last.

---

## Phase 1 — MVP: The Feed

*Goal: A working, beautiful, personal weather feed you actually want to use every day.*

### Core Feed
- [x] Current location detection via browser geolocation
- [x] Current conditions display — temperature, condition label, high/low
- [x] Condition-reactive full-bleed background (clear/cloudy/rain/storm/sunrise/sunset/smoke)
- [x] Animated SVG weather icons — no emoji
- [x] Horizontal scrollable hourly forecast strip
- [x] 7-day forecast cards
- [x] °F / °C toggle, persisted to localStorage
- [x] Responsive layout — mobile first, works on desktop

### Polish
- [x] Smooth background transitions when conditions change
- [x] Loading state that feels intentional (not a spinner — maybe a subtle pulse)
- [x] Error state for geolocation denied

### Deploy
- [x] Vercel deploy with custom domain (wx.something)
- [x] Works cleanly in iOS Safari and Chrome mobile

---

## Phase 2 — Full Wx: All Three Screens

*Goal: The complete app — feed, map, and alerts all working together.*

### Feed Upgrades
- [x] Starred locations — add, remove, reorder via drag
- [x] Location search via Nominatim geocoding
- [x] Configurable card data (user picks what shows: wind / humidity / UV / feels-like)
- [ ] AQI indicator on Feed cards when air quality is notable
- [ ] Alert badge on Feed when active NWS warning exists for a location

### Map Screen
- [ ] Mapbox dark base map
- [ ] Open-Meteo grid data fetched for visible map bounds
- [ ] Precipitation overlay layer
- [ ] Temperature overlay layer
- [ ] Wind speed + direction overlay layer
- [ ] UV index overlay layer
- [ ] Air quality overlay layer (OpenAQ)
- [ ] Layer toggle controls — clean minimal UI
- [ ] Zoom-responsive grid density (fewer data points zoomed out, more zoomed in)
- [ ] Smooth pan + zoom with overlay updating

### Alerts Screen
- [ ] NOAA / NWS severe weather alerts by coordinates
- [ ] USGS earthquake feed — magnitude, depth, distance from user, time
- [ ] NASA FIRMS active fire data — distance, size, containment if available
- [ ] OpenAQ air quality index — AQI level, primary pollutant
- [ ] Local ↔ National scope toggle (local default)
- [ ] Alert severity color system: red (warning) / amber (watch) / gray (all clear)
- [ ] Map view of active alerts with pins
- [ ] San Diego specifics: Santa Ana wind warnings, wildfire smoke AQI

### Infrastructure
- [ ] Cloudflare Workers API proxy — all external API calls go through Workers
- [ ] Cloudflare D1 — store starred locations and user preferences
- [ ] Rate limiting on Workers to protect free API tiers

---

## Phase 3 — PWA + Public Launch

*Goal: Installable, shareable, ready for people beyond friends and family.*

### PWA
- [x] Web app manifest — installable on iOS and Android home screen
- [x] Service worker — cache last-known weather data for offline viewing
- [x] Offline fallback screen — shows last cached data with timestamp
- [ ] Push notifications for NWS severe weather alerts (opt-in per location)
- [ ] Background sync — refresh data when connection restores

### Accounts + Sync
- [ ] Clerk authentication — email magic link or Google OAuth
- [ ] Starred locations synced to D1 per user account
- [ ] Preferences synced across devices
- [ ] Guest mode still works — no forced account creation

### Shareability
- [ ] Share a location's current weather as a live link card
- [ ] OpenGraph meta — weather card previews when link shared to iMessage, Slack, etc.
- [ ] "Add to your Wx" button on shared cards

### Public Launch
- [ ] Landing page explaining Wx and why it exists
- [ ] Public URL, shareable freely
- [ ] Feedback mechanism (simple — email or GitHub issues)

---

## Backlog — Good Ideas, No Phase Yet

| Feature | Why It's Interesting |
|---|---|
| Weather history for a location | "What was it like here on this day last year?" |
| Severe weather notification history | Log of all alerts you've received |
| Hourly "feels like" graph | More honest than just a number |
| Moon phase display | Surprisingly requested by weather nerds |
| Sunrise / sunset times | Useful and fits the aesthetic |
| Swell / surf conditions | San Diego specific — could pull from NOAA buoy data |
| Pollen count | OpenMeteo has this data |
| "Good day for X" mode | AI interprets conditions: good for a hike, bad for a drive |
| Apple Watch companion | Phase 4 fantasy |

---

## Deliberately Not Building

| Feature | Why Not |
|---|---|
| Ads | The entire reason this app exists |
| Paid subscription for basic features | Personal tool first, always free tier available |
| Animated map flyovers / video radar | Complexity vs value not worth it at MVP |
| Social features | Not what this is |
| Hourly radar animation (like weather.com) | Phase 3 backlog at earliest — complex to build from Open-Meteo data |
