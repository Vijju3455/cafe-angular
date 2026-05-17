# Cafe Angular (CafeAngular)

A single-page Angular application for a café website with menu browsing, cart + checkout flow, reservations, gallery, and an embedded AI assistant (demo).

## Features

- **Responsive layout** with shared **Header** and **Footer**
- **Pages / Routes**
  - `/home` (Home)
  - `/about` (About)
  - `/menu` (Menu + cart drawer)
  - `/gallery` (Gallery)
  - `/reservation` (Table reservation – demo)
  - `/contact` (Contact – includes embedded map)
  - `/reviews` (Reviews)
  - `/checkout` (Checkout – demo)
- **Menu + Cart**
  - Add/remove items from a cart drawer
  - Checkout route validates cart is not empty
  - Cart state is managed by `src/app/shared/cart.service.ts`
- **AI Cafe Assistant**
  - `src/app/ai/ai-chatbot.component.ts` and `src/app/ai/ai-voice.component.ts`
  - Simple intent-based demo in `src/app/ai/ai.service.ts`
- **Theme toggle**
  - Theme is persisted in `localStorage` by `src/app/app.ts`

## Tech Stack

- Angular (standalone components)
- TypeScript
- RxJS (via Angular)

## Project Structure (high level)

- `src/app/app.routes.ts` – Router configuration
- `src/app/layout/` – `header` and `footer`
- `src/app/pages/` – page components
- `src/app/shared/` – shared services (cart)
- `src/app/ai/` – AI chatbot + voice components and the demo service
- `src/assets/` – static assets (images)

## Getting Started

### Prerequisites

- Node.js and npm

### Install

```bash
cd cafe-angular
npm install
```

### Run (development)

```bash
npm start
```

Then open the URL shown in the terminal (typically `http://localhost:4200`).

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

## Notes (Demo behavior)

- **Reservations** are stored in the browser using `localStorage` (frontend-only demo).
- **Cart** and checkout behavior are also demo-like and rely on frontend state.
- **Theme** preference persists across refreshes via `localStorage`.

## Routes Reference

The app redirects unknown routes to **home**.

- `''` → `/home`
- `home`, `about`, `menu`, `gallery`, `reservation`, `contact`, `reviews`, `checkout`
- `**` → `home`

## Assets

Static images are served from `src/assets/` and are copied during the Angular build (configured in `angular.json`).

