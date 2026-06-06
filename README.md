# Polaroid

View and manage images in your workspace: thumbnail grid, large preview, copy Base64 / path / file name, and per-project include/exclude folders.

## Requirements

- VS Code (or Cursor) version **1.75.0** or newer.

## Install

**From a **`.vsix`** (sideload):**

```bash
code --install-extension polaroid-1.0.0.vsix
```

Or in VS Code: **Extensions** panel → `⋯` menu → **Install from VSIX…** → pick `polaroid-1.0.0.vsix`.

**Build the **`.vsix`** yourself:**

```bash
npx vsce package   # produces polaroid-<version>.vsix in the project root
```

**Run from source (development):** open the project in VS Code and press **F5** to launch an Extension Development Host with Polaroid loaded.

## Screenshots

### Main panel

![Polaroid main panel — folder group preview in dark theme](https://public-img-1253867148.cos.ap-singapore.myqcloud.com/img-in-docs/dark%20theme%2C%20big%20pictures.png)

![Polaroid main panel — image preview in dark theme](https://public-img-1253867148.cos.ap-singapore.myqcloud.com/img-in-docs/dark%20theme%2C%20big%20pictures%20-%20view.jpg)

This shows another light theme style, as well as switching to a checkerboard background to reveal the transparent parts of SVG images.
![Polaroid main panel — SVG with transparent background in light theme](https://public-img-1253867148.cos.ap-singapore.myqcloud.com/img-in-docs/light%20theme%EF%BC%8Csvg%20icons.png)

## Features

- The full-screen viewer is now powered by our own preview engine, with a smoother browsing experience.
- Moving to next/previous images now feels more natural and follows the folder order you see in the panel.
- The small overview map in preview looks clearer and loads faster, especially for very large images.
- Preview interactions are richer and easier to use (mouse wheel zoom, double-click zoom, quick flip, and easier navigation buttons).
- Thumbnail grid with **lazy loading** and tuning for large libraries (many high-resolution images).
- **Column count** controls grid density (uses panel width efficiently).
- **Sort** images inside each folder (name, modified time, size, asc/desc).
- **Light / dark** UI for the panel; default follows your VS Code or Cursor theme (toggle in the toolbar).
- Preview backdrops: **checkerboard**, **transparent** (default), and solid swatches; useful for PNG/SVG with alpha.
- Zoom and navigate with keyboard.
- **Search** by path/name; filter by **file type**.
- **Include / exclude** folders
- **Copy** path, file name, or Base64 from the image menu.
- Open a folder from Explorer: **only that folder tree** is scanned (fast in huge repos). **Multiple** Polaroid tabs for different folders; tab title includes the folder name.

## How to use

1. Open a folder or workspace in VS Code / Cursor.
2. **Whole workspace (default):** `Ctrl+Shift+P` / `⌘⇧P` → run **「Polaroid」** (command id: `polaroid.webviewImageViewer`).
3. **Folder only:** In the **Explorer**, right-click a **folder** (or an image file) → **Polaroid 🌁**. Only that directory (and subfolders) is indexed in that panel; the editor tab title reflects the folder.
4. **Open a single image:** right-click an image → **Open With… → Polaroid 🌁** (opt-in; the built-in image preview stays the default).

## Release notes

### 1.0.0

- Rebranded to **Polaroid**.
