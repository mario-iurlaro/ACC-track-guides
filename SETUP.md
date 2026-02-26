# ACC Track Guides — Setup & User Guide

A personal GT3 corner reference app that runs as a PWA on your iPad and laptop browser. Corner markers, braking notes, lap times, and track images — all synced automatically via GitHub.

---

## 📁 File Structure

```
acc-track-guides/
│
├── index.html          ← the entire app
├── data.js             ← all track, corner, and lap time data
├── manifest.json       ← PWA config
├── sw.js               ← service worker
│
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
│
└── tracks/
    ├── spa/
    │   ├── track.png       ← circuit map image
    │   ├── t1.png          ← braking zone images
    │   └── ...
    └── monza/
        ├── track.png
        └── ...
```

---

## 🚀 One-Time Setup

### 1. Create a GitHub repo

1. Go to [github.com](https://github.com) → **+** → **New repository**
2. Name it `acc-track-guides` (or anything you like)
3. Set it to **Public** (required for free GitHub Pages)
4. Click **Create repository**

### 2. Upload your files

1. In the new repo click **Add file → Upload files**
2. Drag in everything: `index.html`, `data.js`, `manifest.json`, `sw.js`, the `icons/` folder, and the `tracks/` folder
3. Click **Commit changes**

### 3. Enable GitHub Pages

1. Repo → **Settings** → **Pages**
2. Under Branch select `main` → folder `/root` → **Save**
3. Wait ~60 seconds — your URL will appear: `https://yourusername.github.io/acc-track-guides/`

### 4. Generate a GitHub Personal Access Token

1. github.com → profile picture (top right) → **Settings**
2. Scroll to the very bottom of the left sidebar → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token (classic)**
5. Give it a name, set expiry to **No expiration**
6. Tick only the top-level **`repo`** checkbox
7. Click **Generate token** — copy it immediately (shown only once, starts with `ghp_`)

### 5. Configure the app

1. Open your GitHub Pages URL in Safari (iPad) or any browser (laptop)
2. Tap the **⚙️** icon in the top-right corner
3. Enter your GitHub username, repo name, and token
4. Tap **Save Settings**

Settings are stored in your browser's cookies and localStorage and survive cache clears. You only need to do this once per device.

### 6. Install on iPad as a home screen app

1. Open Safari on iPad → navigate to your GitHub Pages URL
2. Tap **Share** → **Add to Home Screen** → **Add**
3. The ACC Guides icon appears on your home screen — tap it to launch full-screen ✅

---

## 📱 Using the App

### Viewing corners

- Tap a track card to open it
- Tap any corner marker on the map to open the braking notes popup
- Swipe left/right in the popup to move between corners
- On laptop: use ← → arrow keys to navigate

### Lap Times

- Tap the **⏱ Lap Times** tab on any track
- Tap **+ Add Lap Time** to log a lap — enter car/setup, time, weather condition, session, date, and notes
- Laps are ranked fastest first, best lap shown with 🏆
- Best lap time is shown on the track selection card

---

## ✏️ Edit Mode

Tap **✏️ Edit Mode** in the header. A blue bar at the top confirms you're in edit mode.

### Placing a corner

1. Tap anywhere on the track map — a form opens
2. Fill in: Corner ID (e.g. `T1`), name, gear, brake point, speed, notes, and image
3. Tap **Save Corner** — the marker appears on the map

### Moving a corner

Drag any marker to reposition it.

### Editing or deleting a corner

**Tap** (don't drag) a marker in edit mode — an **Edit / Delete** popup appears.

### Adding images to a corner

The image picker has two tabs:

**⬆ Upload** — pick a photo from your device. It will be uploaded automatically to `tracks/[trackid]/` on GitHub when you Push.

**📁 From GitHub** — shows thumbnails of images already in `tracks/[trackid]/` on GitHub. Tap one to select it — no upload needed. Useful when switching between devices or reusing photos across corners.

### Saving your edits

Tap **⬆ Push to GitHub** in the toolbar when you're done.

This does everything in one step:
- Uploads any new images to the correct `tracks/` folder on GitHub
- Commits the updated `data.js` (corners + lap times) to your repo
- Both devices pick up the changes automatically on next open — no cache clearing needed

The status indicator in the header shows:
| Status | Meaning |
|---|---|
| 🟡 ● Unsaved changes | Edits made, not yet pushed |
| 🔵 ⟳ Pushing… | In progress |
| 🟢 ✓ Pushed to GitHub | Done — both devices will update |
| 🔴 ✗ Push failed | Usually a token issue — tap ⚙️ |

---

## ➕ Adding a New Track

### 1. Upload the track map

In your GitHub repo: navigate to `tracks/` → **Add file → Upload files** → type `newtrackid/track.png` in the path field to create the subfolder, upload your circuit map, commit.

### 2. Add the track entry to data.js

In your repo, click `data.js` → ✏️ edit → add a new object to the `tracks` array:

```js
{
  "id": "monza",
  "name": "Autodromo Nazionale di Monza",
  "country": "Italy 🇮🇹",
  "corners": [],
  "laptimes": []
}
```

Commit the change.

### 3. Place the corners

1. Open the app (it loads the latest `data.js` automatically)
2. Enter **Edit Mode** → open the new track
3. Tap the map to place each corner marker, fill in the details
4. Tap **⬆ Push to GitHub** when done

---

## 🔄 Cross-Device Sync

Everything syncs through GitHub:

- **Corner positions, braking notes, and lap times** all live in `data.js` — push from either device to sync
- **Braking zone images** live in `tracks/[id]/` — uploaded automatically when you push
- The app always loads the latest `data.js` fresh on every open — no stale cache issues
- **GitHub settings** (token, username, repo) are stored locally per browser — enter once per device, they persist through cache clears

---

## 💡 Tips

- Track map images should be **landscape PNGs** — the app scales them to fill the screen width, markers stay locked to the correct position at any screen size or orientation
- Braking zone images can be any aspect ratio — they fill the left panel of the corner popup
- Keep Corner IDs short (T1, T2, Bus Stop) — they're what appear on the map markers
- If a Push fails, check your token hasn't expired: github.com → Settings → Developer settings → your token
- To revoke access, delete the token on GitHub — generate a new one and update ⚙️ in the app

---

## 🆘 Troubleshooting

| Problem | Fix |
|---|---|
| App shows old version on laptop | Open the URL in the browser (not installed PWA) and hard-refresh (Cmd+Shift+R) |
| App shows old version on iPad | Close and reopen the app — it fetches fresh data on every launch |
| GitHub settings lost | Re-enter in ⚙️ — only happens if both cookies and localStorage were cleared simultaneously |
| Push fails with auth error | Token may have expired — generate a new one and update ⚙️ |
| Images not showing in popup | Check the filename in corner details matches exactly (case-sensitive) and the file is in `tracks/[trackid]/` |
| Corner markers in wrong position | Re-place them in Edit Mode on the device you want to use as the source of truth, then push |
| Track not appearing | Check `data.js` has valid JSON — paste it into [jsonlint.com](https://jsonlint.com) to find any errors |
| "From GitHub" gallery is empty | No images in `tracks/[trackid]/` yet — use the Upload tab first |
