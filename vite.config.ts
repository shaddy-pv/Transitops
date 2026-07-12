import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from '@tanstack/react-start/plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackStart(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    host: "::",
    port: 8080,
  },
});
