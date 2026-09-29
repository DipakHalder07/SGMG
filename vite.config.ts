import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    // Hashed build output lives apart from public/assets, so vercel.json can
    // cache it forever without also freezing replaceable images.
    assetsDir: "static",
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-maps": ["leaflet"],
          "vendor-animation": ["gsap", "lenis"],
          "vendor-ui": ["@splidejs/splide", "canvas-confetti", "lucide-react"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
