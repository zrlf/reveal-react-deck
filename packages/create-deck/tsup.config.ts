import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // CLI entry-point
  format: "esm",
  platform: "node",
  target: "node20",
  outDir: "dist",

  clean: true,
  sourcemap: false,
  minify: false,
  dts: false,
});
