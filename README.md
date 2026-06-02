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

## Tech Stack

React · TypeScript · Vite · Tailwind CSS · Vitest · ESLint · GitHub Actions
