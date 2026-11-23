# Juhi's 4th Anniversary Site

Plain HTML, CSS and JS. No build step.

## Add your assets
Drop files in with these exact names. Any of png, jpg, jpeg, gif or webp works, so no code edits needed. Until a file exists, a labelled dashed box shows instead.

- `assets/memes/`: `cat-meme-1` to `cat-meme-6`, `milk-mocha-1` to `milk-mocha-7` (13 slots)
- `assets/photos/`: `photo-1` to `photo-5` (timeline), `video-poster.jpg` (video poster)
- `assets/video/proposal.mp4`
- `assets/rickroll.gif` (the surprise, shown from the "Play our song" button)

## Edit text
Search `index.html` for comments marked `PHOTO`, `DATE`, `CAPTION`, `MEME` and `LETTER`. Moments 2 to 5 have TODO captions. The days counter start date is `START` at the top of `script.js`.

## Deploy to GitHub Pages
1. Create a repo and push these files to the root of the `main` branch.
2. On GitHub: Settings, Pages, Source: "Deploy from a branch", Branch: `main`, folder `/ (root)`, Save.
3. Wait a minute. The site goes live at `https://<username>.github.io/<repo>/`.

Notes: keep video under 100 MB (GitHub file limit) and compress it if needed. Test locally with `python3 -m http.server`.
