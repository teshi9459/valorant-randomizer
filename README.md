# Valorant Randomizer

Eine Vue 3 Web-Applikation zum Randomisieren von Valorant Agents, Waffen, Maps und mehr.

## Features

### 🎮 Drei Modi

- **Lobby Mode**: Füge Spieler zu Teams hinzu (5v5) und randomisiere für jeden Spieler
- **Rounds Mode**: Generiere eine Liste von Runden (1-99) mit zufälligen Loadouts
- **Category Mode**: Einfache Randomisierung von ausgewählten Kategorien

### 📊 Kategorien

- **Agents** (mit optionalen Abilities)
- **Weapons**
- **Maps**
- **Shields**

### 🔍 Filter

- **Agents**: Nach Rolle (Duelist, Controller, etc.) und Starter Agents
- **Weapons**: Nach Typ (Pistol, Rifle, etc.) und Spezial-Waffen ausschließen
- **Maps**: Nach Anzahl der Plant Spots (2 oder 3 Sites)

### ✨ Weitere Features

- **LocalStorage Cache**: API-Daten werden 24h gecacht für schnellere Ladezeiten
- **URL-Sharing**: Teile deine Ergebnisse über URL-Parameter
- **Valorant Theme**: Design inspiriert vom Valorant-Look
- **Responsive Design**: Funktioniert auf Desktop und Mobile

## Tech Stack

- Vue 3 mit Composition API
- TypeScript
- Vite
- Vue Router 4
- Pinia (State Management)
- Axios (HTTP Client)
- VueUse (Composition Utilities)

## Entwicklung

### Voraussetzungen

- Node.js 18+ und npm

### Installation

```bash
# Dependencies installieren
npm install

# .env Datei erstellen (optional)
cp .env.example .env

# Dev Server starten
npm run dev
```

Der Dev Server läuft auf `http://localhost:5173/`

### Build

```bash
# Produktions-Build erstellen
npm run build

# Build lokal testen
npm run preview
```

## Docker

### Mit docker-compose (empfohlen)

```bash
# Starten
docker-compose up -d

# Mit Rebuild
docker-compose up -d --build

# Stoppen
docker-compose down

# Logs anzeigen
docker-compose logs -f
```

App ist verfügbar unter: `http://localhost:8080`

### Ohne docker-compose

```bash
# Docker Image bauen
docker build -t valorant-randomizer .

# Container starten
docker run -d -p 8080:80 --name valorant-randomizer valorant-randomizer

# Container stoppen
docker stop valorant-randomizer

# Container entfernen
docker rm valorant-randomizer
```

### Features im Docker-Image

- ✅ Multi-stage Build für kleinere Image-Größe
- ✅ Nginx als Production-Server
- ✅ Gzip-Kompression aktiviert
- ✅ Security Headers konfiguriert
- ✅ SPA-Routing konfiguriert
- ✅ Health-Check integriert
- ✅ Static Asset Caching (1 Jahr)

## Projektstruktur

```
src/
├── assets/styles/      # CSS-Variablen und globale Styles
├── components/         # Vue Components
│   ├── common/        # Wiederverwendbare Components (VButton, VCard, etc.)
│   ├── filters/       # Filter Components
│   ├── lobby/         # Lobby Mode Components
│   ├── rounds/        # Rounds Mode Components
│   ├── category/      # Category Mode Components
│   └── layout/        # Layout Components (Header, Footer)
├── composables/       # Vue Composables
├── services/          # Services (API, Randomizer)
│   ├── api/          # API Integration und Cache
│   └── randomizer/   # Randomisierungs-Logik
├── stores/            # Pinia Stores
├── types/             # TypeScript Types
├── views/             # Vue Router Views
└── router/            # Router Konfiguration
```

## API

Dieses Projekt nutzt die [Valorant API](https://valorant-api.com/) für alle Spielinformationen.

## Features im Detail

### URL-Sharing

Teile deine Ergebnisse mit anderen:
- Klicke auf den "🔗 Teilen" Button in jedem Modus
- Der Link wird in die Zwischenablage kopiert
- Beim Öffnen des Links wird der komplette State wiederhergestellt
- Funktioniert für alle drei Modi

### LocalStorage Cache

- API-Daten werden 24 Stunden gecacht
- Schnellere Ladezeiten bei wiederholten Besuchen
- Automatische Cache-Invalidierung bei neuen Versionen

### Filter-System

Umfangreiche Filteroptionen für jede Kategorie:
- **Agents**: Nach Rolle filtern, nur Starter Agents
- **Weapons**: Nach Typ filtern, Spezial-Waffen ausschließen
- **Maps**: Nach Anzahl der Bomb Sites filtern
- **Abilities**: Optional mit Agents randomisieren

## Roadmap

- [x] Projekt-Setup und Grundstruktur
- [x] API-Integration mit Cache
- [x] Router und Navigation
- [x] Common Components
- [x] Lobby Mode vollständig implementiert
- [x] Rounds Mode vollständig implementiert
- [x] Category Mode vollständig implementiert
- [x] Filter Components für alle Kategorien
- [x] URL-Sharing Feature
- [x] Docker Setup
- [x] Responsive Design
- [ ] Tests (optional)
- [ ] PWA Support (optional)

## Lizenz

MIT

## Credits

- Daten von [Valorant API](https://valorant-api.com/)
- Inspiriert von Valorant (Riot Games)
