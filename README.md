# Selim Topuz – Portfolio Website

Minimalistisches Bewerbungs-Portfolio im Stil einer persönlichen Timeline-Seite.

## Starten

```bash
npm install
npm run dev
```

## Inhalte anpassen

Alle Daten liegen in **`src/data/profile.ts`**:

- `name`, `tagline`, `avatarUrl` (Profilfoto)
- `socialLinks` – Icons für GitHub, LinkedIn, E-Mail etc.
- `timeline` – Werdegang mit Zeitraum, Logo, Text und optionaler nummerierter Liste

### Timeline-Format

```typescript
{
  period: "2024 –",
  logo: { alt: "Firma", initials: "FI", imageUrl: "/logos/firma.png" },
  paragraphs: [
    [
      { type: "text", value: "Ich arbeite bei " },
      { type: "link", label: "Firma", url: "https://..." },
      { type: "text", value: " als Software Engineer." },
    ],
  ],
  numberedList: ["Projekt A", "Projekt B"], // optional
}
```

## Qualitätssicherung

```bash
npm run check
```

## Veröffentlichen (Cloudflare Pages)

1. Repository auf GitHub pushen.
2. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Repository auswählen und Build-Einstellungen setzen:
   - **Framework preset:** None (oder Vite)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable (optional):** `NODE_VERSION` = `22`
4. **Save and Deploy** — nach jedem Push auf `main`/`master` wird neu gebaut.
5. **Custom domain:** Pages-Projekt → **Custom domains** → `selim-topuz.dev` hinzufügen und DNS laut Cloudflare-Anleitung setzen.

Unterseiten wie `/projekte/genai4pc` funktionieren dank `public/_redirects` (SPA-Fallback auf `index.html`).

Lokal vor dem Deploy:

```bash
npm run build
npm run preview
```

## Tech Stack

React · TypeScript · Vite · Tailwind CSS · Vitest · ESLint · GitHub Actions
