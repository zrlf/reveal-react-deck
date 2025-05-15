import { defineConfig } from "tsup";

export default defineConfig({
  entry: { plugins: "./src/plugins/index.ts" },
  format: "esm",
  dts: true,
  splitting: true,
  clean: false,
  target: "es2022",
  external: ["react", "acorn"],
});
