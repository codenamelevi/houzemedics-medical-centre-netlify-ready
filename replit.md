# Houzemedics Medical Centre

A single-page marketing and booking website for Houzemedics Medical Centre — a General Practitioner and IV Drip Lounge in Northwold, Randburg, South Africa.

## Stack

- **React 19** + **React Router DOM 7** (client-side routing, BrowserRouter)
- **Vite 8** (dev server + build)
- **pnpm** for package management
- No backend — bookings are handled via WhatsApp deep-links

## Running the project

```bash
pnpm install
pnpm dev --host 0.0.0.0 --port 5000
```

The "Start application" workflow runs this automatically. The app is served at port 5000.

## Project structure

```
index.html          # Entry HTML
src/
  main.jsx          # Entire app (all pages, components, routing)
  styles.css        # All styles
public/
  images/           # Clinic photos (storefront, gallery, doctor, etc.)
```

## Pages

| Route | Component |
|-------|-----------|
| `/` | Home |
| `/about` | About (Dr TJ Tite) |
| `/services` | Full services list with WhatsApp booking |
| `/gallery` | Photo gallery |
| `/booking` | Booking page |
| `/contact` | Contact form + map |

## Notes

- Booking opens a WhatsApp pre-filled message; no form backend is wired.
- The Contact form has a `/* PLACEHOLDER */` comment — it needs a real form handler (e.g. Formspree, EmailJS) to actually send messages.
- Gallery images (`/public/images/`) are not included in the repo; add your own photos with the filenames referenced in `src/main.jsx`.
- Originally configured for Netlify (`netlify.toml`) but runs fine on Replit.

## User preferences
