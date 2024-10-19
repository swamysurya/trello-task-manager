import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import 'path' using ESM

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /* This part of the config tells Vite where to look for 
  our project’s JavaScript and how the development server should
  behave (pulling from the src folder with hot reload). */
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
