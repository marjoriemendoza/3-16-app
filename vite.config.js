import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// El frontend llama a /api/v1 en el mismo origen; en desarrollo Vite reenvía
// esas peticiones a la API de NestJS (evita CORS y no requiere configuración
// extra en el backend). En producción se sirve detrás del mismo origen o se
// define VITE_API_URL con la URL pública de la API.
const apiTarget = process.env.VITE_API_PROXY_TARGET || "http://localhost:3000";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
});
