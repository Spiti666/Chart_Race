# Bundesliga Tippspiel 2023/2024 Visualisierung

[![](https://img.shields.io/badge/Sprache-Deutsch-blue)](README.md)
[![](https://img.shields.io/badge/Technologie-React-blue)](https://reactjs.org/)

Interaktive Datenvisualisierung für den Punkteverlauf eines Bundesliga-Tippspiels über die gesamte Saison 2023/2024.

![img](chrome_HNyStgbzut.mp4)

> **Hinweis:** Um die Animation auf GitHub anzuzeigen, sollte das Video in ein GIF konvertiert werden. Beispiel: `ffmpeg -i chrome_HNyStgbzut.mp4 -vf "fps=10,scale=800:-1" output.gif`

## Features

- **Animiertes Balkenrennen** zeigt die Punkteentwicklung von 8 Spielern über 34 Bundesliga-Spieltage
- **Interaktive Steuerelemente** zum Abspielen, Pausieren und Zurücksetzen der Animation
- **Anpassbare Geschwindigkeit** (langsam, normal, schnell)
- **Manueller Modus** zur Navigation zwischen einzelnen Spieltagen
- **Top-Performer Hervorhebung** für jeden Spieltag
- **Farbkodierung** für einfache Spieleridentifikation

## Technologien

- **React** mit TypeScript für die UI-Komponenten
- **Framer Motion** für flüssige Animationen
- **Tailwind CSS** für das responsive Design
- **Vite** als Build-Tool

## Schnellstart

Voraussetzung: Node.js & npm müssen installiert sein.

```bash
# Installation der Abhängigkeiten
npm install

# Entwicklungsserver starten
npm run dev
```

## Datenstruktur

Die Punktedaten sind in einer strukturierten Form gespeichert:

- Jeder Spieler hat eine eindeutige Farbkodierung
- Punkte werden für alle 34 Spieltage erfasst
- Rangänderungen werden live visualisiert

## Build

```bash
# Produktionsbuild erstellen
npm run build

# Vorschau des Builds
npm run preview
```

## Customization

Die Animation kann über verschiedene Parameter angepasst werden:
- Geschwindigkeit der Animation
- Start- und Endpunkt der Zeitlinie
- Farbgebung der Balken
- Hervorhebung bestimmter Spieler
