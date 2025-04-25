import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import RevealPreset from "reveal-react-deck/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), RevealPreset(), tailwindcss()],
});
