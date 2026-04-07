import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { version } from "./package.json";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  root: __dirname,
  base: mode === "production" ? "/demo/ai-orchestration/" : "/",
  server: {
    host: "::",
    port: 5309,
  },
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify(version),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
