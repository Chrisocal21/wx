# Wx — Project Brief

> *Weather, without the noise.*

---

## The Problem

Weather.com is a billboard that occasionally shows weather. Every major app either costs money, requires an account, or buries the forecast under ads, sponsored content, and clickbait articles. There is no clean, fast, beautiful weather app you can just *use*.

## The Solution

Wx — a personal-first, ad-free weather web app with three distinct screens, a strong visual identity, and zero noise. Built entirely on free APIs, deployed on Cloudflare + Vercel, eventually shareable as a PWA.

## Audience

- **Phase 1:** Chris only — personal tool
- **Phase 2:** Friends and family beta
- **Phase 3:** Public launch as an installable PWA

## Core Differentiators

- No ads, no account required for core features
- Condition-reactive UI — the app *feels* like the weather outside
- Emergency awareness (earthquakes, fire, severe weather) built in natively
- Clean SVG-animated icons, no emoji, no cartoon clipart
- Weather map overlay built from Open-Meteo data — no paid map layers
- Air quality + wildfire smoke front and center (designed for SoCal)

---

## The Three Screens

### 1. Feed — Home Screen

The personal dashboard. The screen you live on.

**Layout:**
- Full-bleed background reacting to current conditions + time of day
- Giant dominant temperature, city name, condition label
- Current location pinned to top, starred locations scrollable below
- Each location card: temp, high/low, condition icon, precipitation chance
- Horizontal scrollable hourly strip
- 7-day forecast below
- User-configurable card data (wind, humidity, UV index, feels-like)
- Drag to reorder starred locations

**Background system — mood shifts by condition + time:**
| Condition | Background |
|---|---|
| Clear day | Bright sky blue gradient |
| Clear night | Deep navy, subtle star texture |
| Overcast | Muted gray-blue, flat light |
| Rain / storm | Dark navy-to-purple |
| Sunrise / sunset | Warm amber-to-pink |
| Wildfire / smoke | Muted orange-brown wash |

---

### 2. Map — Weather Layer Screen

The interactive radar-style screen. Built from Open-Meteo grid data rendered as a custom overlay on Mapbox dark tiles.

**Zoom behavior:**
| Zoom Level | What Shows |
|---|---|
| Country / region | Temperature gradients, major storm systems |
| City level | Hourly precipitation, wind direction arrows |
| Neighborhood | Hyper-local grid — Open-Meteo's full resolution |

**Toggleable layers:**
- Precipitation / radar
- Temperature overlay
- Wind speed + direction
- UV index
- Air quality (OpenAQ free tier)

---

### 3. Alerts — Emergency Screen

Real-time emergency awareness. Nothing like this exists cleanly in consumer weather apps.

**Data sources:**
| Source | Data | Cost |
|---|---|---|
| NOAA / NWS API | US severe weather alerts by coordinates | Free, no key |
| USGS Earthquake API | Global real-time earthquakes, magnitude + depth | Free, no key |
| NASA FIRMS | Active fire + thermal anomaly data | Free |
| OpenAQ | Air quality index, wildfire smoke | Free tier |

**Scope toggle:** Local (within X miles) ↔ National — local by default.

**Alert card design:**
- Red for active warnings, amber for watches, gray for all-clear
- Map pins for active incidents
- Earthquake display: "3.2 magnitude · 18 miles SE · 6 min ago"
- Wildfire display: containment %, distance, wind direction relative to you
- San Diego specifics: Santa Ana wind warnings, smoke AQI front and center

---

## Aesthetic Direction

**Mood:** Dark, atmospheric, meteorologist-credible. Not cartoony. Not corporate.

**Typography:** Large confident numbers for temperature. Clean sans-serif for everything else.

**Icons:** Animated SVG only. No emoji. Candidates:
- Meteocons (open source, SVG-based)
- Bas Milius Weather Icons (SVG, designed for dark UIs)
- Custom set of hand-crafted SVGs with CSS animation (sun rays rotating, raindrops falling, lightning flickering)

**Color palette:** Condition-driven, not a fixed palette. The UI *is* the weather.

---

## Value Proposition

| Pain Point | Wx Solution |
|---|---|
| Weather.com ads | Zero ads, ever |
| Paywalled features | Everything free, always |
| No emergency context | Earthquakes, fire, alerts built in |
| Generic UI | Reacts to your actual conditions |
| Can't install it | PWA — lives on your home screen |
