# ImageGen Generated Assets

This folder contains project-bound raster assets generated with the built-in ImageGen tool.

## Source

- `source/sandplay-assets-atlas-chromakey.png`: original ImageGen output on a flat chroma-key background.
- `source/sandplay-assets-atlas-transparent.png`: local chroma-key removal output with alpha.
- `*.png`: individual 512x512 transparent PNG sandplay objects sliced from the transparent atlases.
- `contact-sheet.jpg`: QA preview sheet only; the app does not use this file.

## Prompt Summary

The atlases were generated as 4x4 grids of isolated sandplay miniature objects in a 3/4 top-down, soft hand-drawn healing illustration style, low-saturation warm colors, no text, no watermark, and flat #00ff00 chroma-key background for local transparency removal.

SVG files in `assets/placeholders/` are retained only as fallback/reference files. The running app now uses the PNG files in this folder for the visible sand具 library.
