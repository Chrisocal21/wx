# Wx — Open Questions

> Unresolved decisions, risks, and things worth exploring.

---

## Design

- [ ] Does the background transition animate smoothly between conditions or cut hard?
- [ ] Light mode option, or keep dark/atmospheric backgrounds only?

## Technical

- [ ] Map overlay rendering approach — HTML Canvas vs WebGL vs SVG layer? Canvas is simpler, WebGL is smoother at scale.
- [ ] How many Open-Meteo grid points to fetch per map viewport? Need to balance visual smoothness vs API call count.
- [ ] NASA FIRMS requires a key — how is the key managed? Cloudflare Workers secret, not exposed client-side.
- [ ] OpenAQ free tier rate limits — need to check before relying on it for map layer.
- [ ] Push notification delivery for NWS alerts — polling interval on the Worker, or does NWS have webhooks?
- [ ] Backend migration — when to move from client-side API calls to Cloudflare Workers proxy?

## Product

- [ ] What's the custom domain? wx.something — wx.app? wx.fyi? wx.today?
- [ ] Swell / surf data for San Diego — worth adding to the backlog? NOAA buoy data is free.
- [ ] "Good day for X" AI interpretation — fun Phase 3 feature or scope creep?
- [ ] Pollen data — Open-Meteo has it, is it worth surfacing?
- [ ] Background sync for PWA — refresh data when connection restores?
- [ ] Push notifications — implement for severe weather alerts?

---

## Answered Questions

| Question | Decision | Status |
|---|---|---|
| PWA — when? | Phase 3 | ✅ Implemented |
| Icon style | Animated SVG only — no emoji, no PNG | ✅ Built custom SVG icons |
| Map weather overlay | Built from Open-Meteo data ourselves — no paid Mapbox layers | ⏳ Not yet built |
| Air quality source | OpenAQ free tier | ⏳ Planned for alerts screen |
| Emergency scope | Both local and national — local default, toggle to national | ⏳ Planned for alerts screen |
| App name | **Wx** | ✅ Final |
| Which SVG icon library? | Custom-built SVG icons with animations | ✅ Implemented |
| Loading state design | Skeleton screens matching app layout | ✅ Implemented |
| Font choice | Inter (Google Fonts) — strong numerals for temperature | ✅ Implemented |
| Phase 1 backend | Pure client-side calling Open-Meteo directly | ✅ Implemented |
| Service worker caching | Network-first for APIs, cache-first for assets | ✅ Implemented |
| Starred locations storage | localStorage with client-side persistence | ✅ Implemented |
| Location search | Open-Meteo Geocoding API | ✅ Implemented |
| Reverse geocoding | BigDataCloud API (free, no key) | ✅ Implemented |
| Deployment platform | Vercel with automatic deployments | ✅ Deployed |
