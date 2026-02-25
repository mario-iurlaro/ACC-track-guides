# ACC Track Guides — GitHub Pages Setup & Update Guide

---

## 📁 Your complete file structure

```
acc-track-guides/          ← this is your GitHub repo folder
│
├── index.html             ← the app
├── data.js                ← all track + corner data
├── manifest.json          ← PWA config (don't edit)
├── sw.js                  ← offline service worker (don't edit)
│
├── icons/
│   ├── icon-192.png       ← home screen icon
│   └── icon-512.png
│
└── tracks/
    ├── spa/
    │   ├── track.png
    │   ├── t1.png
    │   └── ...
    └── nurburgring/
        ├── track.png
        └── ...
```

---

## 🚀 One-time Setup (do this once)

### Step 1 — Create a GitHub repo

1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it `acc-track-guides` (or anything you like)
4. Set it to **Public** ← this is required for free GitHub Pages
5. Leave everything else as default → click **Create repository**

### Step 2 — Upload your files

1. In your new empty repo, click **Add file → Upload files**
2. Drag in the entire contents of your app folder:
   - `index.html`
   - `data.js`
   - `manifest.json`
   - `sw.js`
   - The `icons/` folder
   - The `tracks/` folder (with all your images)
3. Scroll down → click **Commit changes**

> ⚠️ GitHub's web uploader handles folders fine — just drag the whole lot in at once.

### Step 3 — Enable GitHub Pages

1. In your repo, click **Settings** (top tab)
2. In the left sidebar, click **Pages**
3. Under **Branch**, select `main` → folder `/root` → click **Save**
4. Wait ~60 seconds, then refresh the page
5. You'll see: *"Your site is live at https://yourusername.github.io/acc-track-guides/"*

### Step 4 — Install on iPad

1. Open Safari on your iPad
2. Go to your URL: `https://yourusername.github.io/acc-track-guides/`
3. Tap the **Share** button (box with arrow) → **Add to Home Screen**
4. Name it **ACC Guides** → tap **Add**
5. The app icon appears on your home screen — tap it to launch full screen ✅

---

## 🔄 Adding a New Track (the ongoing workflow)

This is what you'll do every time you want to add a track:

### Add the track images

1. Go to your repo on github.com
2. Navigate into the `tracks/` folder
3. Click **Add file → Upload files**
4. Create a new subfolder by typing the track name in the path box,
   e.g. type `monza/` then upload:
   - `track.png` ← the circuit map
   - `t1.png`, `t2.png` etc. ← braking zone images
5. Commit

### Add the track data

1. Click on `data.js` in your repo
2. Click the **✏️ pencil** (Edit) icon
3. Add your new track at the end of the `tracks` array — copy this template:

```js
  {
    "id": "monza",
    "name": "Autodromo Nazionale di Monza",
    "country": "Italy 🇮🇹",
    "corners": []
  }
```

4. Click **Commit changes**

### Place the corners

Once the track appears in the app:
1. Open the app on your iPad (pull to refresh if needed)
2. Tap **✏️ Edit Mode**
3. Open the track → tap the map to place corner markers visually
4. Fill in the notes and image name for each corner
5. Tap **⬇ Export data.js** → this downloads an updated `data.js`
6. Go back to github.com → click `data.js` → click ✏️ pencil
7. Select all the text, paste in the new file contents
8. Commit → done in ~60 seconds ✅

---

## 💡 Tips

- **The app updates automatically** the next time you open it after a commit
  (or force-refresh with pull-to-refresh in Safari if it's slow)
- **Lap times are stored locally on your iPad** — they never go to GitHub,
  so they survive repo changes and are private to your device
- **Corner edits** (from Edit Mode) are only saved locally until you export
  `data.js` and commit it — always export after a session if you want to keep the work
- If you ever want to **replace an icon**, just upload a new `icon-192.png`
  and `icon-512.png` to the `icons/` folder and commit

---

## 🆘 Quick troubleshooting

| Problem | Fix |
|---|---|
| App shows old version | Pull to refresh in Safari, or clear website data in iPad Settings |
| Images not showing | Check filename and folder match exactly — filenames are case-sensitive |
| GitHub Pages URL not working | Wait 2 minutes after enabling, then hard-refresh |
| "data.js not found" error | Make sure `data.js` is in the root of the repo, not inside a subfolder |
