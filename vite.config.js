import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
      strategies: "injectManifest",
      injectManifest: {
        swDest: "dist/sw.js",
      },
      workbox: {
        globPatterns: ["**/*"],
      },
      includeAssets: ["**/*"],
      manifest: {
        name: "MySwimmingApp",
        short_name: "MySwimmingApp",
        start_url: "/login",
        scope: ".",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#1976d2",
        description:
          "Monitore seus de treinos de natação diretamente do seu navegador!",
        dir: "ltr",
        lang: "pt-BR",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/assets/screenshot-desktop1.png",
            sizes: "1440x917",
            type: "image/png",
            form_factor: "wide",
            label: "Monitoramento de Treinos",
          },
          {
            src: "/assets/screenshot-desktop2.png",
            sizes: "1440x917",
            type: "image/png",
            form_factor: "wide",
            label: "Monitoramento de Estatísticas",
          },
          {
            src: "/assets/screenshot-mobile1.png",
            sizes: "375x812",
            type: "image/png",
            form_factor: "narrow",
            label: "Monitoramento de Treinos",
          },
          {
            src: "/assets/screenshot-mobile2.png",
            sizes: "375x812",
            type: "image/png",
            form_factor: "narrow",
            label: "Monitoramento de Estatísticas",
          },
        ],
      },
    }),
  ],
});
