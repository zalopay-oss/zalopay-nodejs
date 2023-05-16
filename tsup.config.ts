import { defineConfig } from "tsup";

export default defineConfig([
  {
    name: "main",
    entry: ["./src/zalopay/index.ts"],
    platform: "node",
    format: ["esm", "cjs"],
    outDir: "./lib",
    sourcemap: false,
    bundle: true,
    splitting: false,
    dts: true
  }
]);
