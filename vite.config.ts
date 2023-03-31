import { ViteAliases } from "vite-aliases";
import { ViteWebfontDownload } from "vite-plugin-webfont-dl";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import { defineConfig } from "vite";
import preload from "vite-plugin-preload";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
import mix from 'vite-plugin-mix'

export default defineConfig({
  plugins: [
    react(),
    preload(),
    removeConsole(),
    chunkSplitPlugin(),
    ViteWebfontDownload(),
    mix.default({
      handler:"src/api/handler.js",
    }),
    ViteAliases({
      useConfig: true,
    }),
    viteCompression({
      algorithm: "brotliCompress",
      threshold: 100,
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 30,
      },
      pngquant: {
        quality: [0.7, 0.8],
        speed: 4,
      },
      webp: {
        quality: 70,
      },
      svgo: {
        multipass: true,
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "minifyStyles",
          },
          {
            name: "removeMetadata",
          },
          {
            name: "removeUselessStrokeAndFill",
          },
          {
            name: "reusePaths",
          },
          {
            name: "removeEmptyAttrs",
            active: true,
          },
        ],
      },
    }),
  ],
});
