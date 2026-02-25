# GT3 Corner Guide v2 — File Structure & Setup

## 📁 Folder Layout

```
gt3-corner-guide/
│
├── index.html          ← The entire app
├── data.js             ← All track + corner data (export from Edit Mode)
│
└── tracks/
    ├── spa/
    │   ├── track.png   ← Track map shown on the selection card + map screen
    │   ├── t1.png      ← Braking zone image for corner T1
    │   ├── t2.png
    │   ├── t5.png
    │   ├── t10.png
    │   ├── t15.png
    │   └── t18.png
    │
    └── nurburgring/
        ├── track.png
        ├── t1.png
        ├── t5.png
        ├── t8.png
        └── t13.png
```

> The track folder name must match the `"id"` field in `data.js`
> (e.g. id `"spa"` → folder `tracks/spa/`)

---

## ✏️ Edit Mode Workflow

### Adding corners to a new track

1. Open the app in Safari on your iPad
2. Tap **✏️ Edit Mode** in the top right
3. Navigate into a track
4. **Tap anywhere on the map** to place a corner marker
5. A form pops up — fill in: Corner ID, Name, Gear, Brake Point, Speed, Notes
6. Tap the image area to **pick your braking zone image** (must be in the track folder already)
7. Hit **Save Corner** → marker appears exactly where you tapped
8. **Drag markers** to fine-tune position

### Saving your work

Corner positions are saved to the browser during your session automatically.

To make them permanent:
1. Tap **⬇ Export data.js** in the edit toolbar
2. A new `data.js` is downloaded
3. Replace the old `data.js` in your app folder with the new one

Next time you open the app, all your corners load from file. ✅

---

## ➕ Adding a New Track

1. Add a new entry to `data.js` (manually or use Edit Mode):

```js
{
  "id": "monza",
  "name": "Autodromo di Monza",
  "country": "Italy 🇮🇹",
  "corners": []   // leave empty — use Edit Mode to place them
}
```

2. Create the folder `tracks/monza/` and add `track.png` plus your corner images
3. Reload the app — the track card appears, ready for Edit Mode

---

## 📱 Running on iPad

1. Copy the whole folder (index.html + data.js + tracks/) to your iPad via AirDrop or USB
2. Open **Safari** → tap the folder in Files → tap `index.html`
3. Tap Share → **Add to Home Screen** for a full-screen app experience

> ✅ Works 100% offline. No internet needed.

---

## ⚠️ Image Notes

| File       | What it's for                   | Recommended size |
|------------|----------------------------------|-----------------|
| track.png  | Track map (card + map screen)    | 1200×800px      |
| t1.png etc | Braking zone diagram per corner  | 900×600px       |

Images must be in the track's subfolder before you pick them in Edit Mode.
The app stores only the filename (e.g. `t1.png`), not the full path.
