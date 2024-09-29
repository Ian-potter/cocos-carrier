import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    // mkcert()
  ],
  server: {
    proxy: {
      "/in-app-purchase-testnet": {
        target: "https://game-station-test.portkey.finance",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/in-app-purchase-testnet/, ""),
      },
      "/in-app-purchase-mainnet": {
        target: "https://game-station.portkey.finance",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/in-app-purchase-mainnet/, ""),
      },
    },
  },
});
