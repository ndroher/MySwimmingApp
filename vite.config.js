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
      },
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      injectManifest: {
        swDest: "sw.js",
      },
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
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "../src/Assets/screenshot-desktop1.png",
            sizes: "1440x917",
            type: "image/png",
            form_factor: "wide",
            label: "Monitoramento de Treinos",
          },
          {
            src: "../src/Assets/screenshot-desktop2.png",
            sizes: "1440x917",
            type: "image/png",
            form_factor: "wide",
            label: "Monitoramento de Estatísticas",
          },
          {
            src: "../src/Assets/screenshot-mobile1.png",
            sizes: "375x812",
            type: "image/png",
            form_factor: "narrow",
            label: "Monitoramento de Treinos",
          },
          {
            src: "../src/Assets/screenshot-mobile2.png",
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
