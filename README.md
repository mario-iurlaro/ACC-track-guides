# ACC Track Guides

A personal corner reference app for GT3 racing, built as a Progressive Web App. Runs in your browser and installs as a home screen app on iPad. Built with Claude.ai

![ACC Track Guides](icons/icon-192.png)

## Features

- **Track maps** with interactive corner markers
- **Braking notes** per corner — gear, brake point, min speed, technique notes
- **Braking zone images** — upload from device or pick from existing GitHub images
- **Lap times** with weather conditions, ranked fastest first
- **Edit Mode** — place and drag corner markers visually on the map
- **GitHub sync** — one-tap push keeps laptop and iPad in sync automatically
- **PWA** — installs as a standalone home screen app on iPad, works offline for images

## Setup

See [SETUP.md](SETUP.md) for full installation and usage instructions.

## Tech

Single-file HTML/CSS/JS app. No framework, no build step. Data lives in `data.js` and syncs via the GitHub Contents API. Images are served from `tracks/[id]/` in the repo.
