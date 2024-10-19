import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import 'path' using ESM

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // root: path.resolve(__dirname, "src"), // Use ESM 'path' import
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"), // Alias for Bootstrap
    },
  },
  server: {
    port: 8080,
    hot: true, // Enable HMR (hot module replacement)
    watch: {
      usePolling: true, // Useful if you face issues with HMR not working due to file changes not being detected
    },
  },
});
