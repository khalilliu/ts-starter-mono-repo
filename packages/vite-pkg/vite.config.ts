import react from "@vitejs/plugin-react";
import type { UserConfigExport } from "vite";
import { resolve } from "node:path";
import { build, defineConfig } from "vite";
import dts from "vite-plugin-dts";
// import { EsLinter, linterPlugin } from "vite-plugin-linter";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(((configEnv) => ({
  plugins: [dts({ include: ["src/"] }), react(), tsConfigPaths()],
  build: {
    lib: {
      entry: resolve("src/", "index.ts"),
      name: "react-json-view",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
})) as UserConfigExport);
