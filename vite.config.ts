import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// import mkcert from "vite-plugin-mkcert";

import fs from "fs";

const rewriteEnv = () => {
  const name = process.env.ENV_NAME || "testnet";
  console.log(name, "name===");
  try {
    const data = fs.readFileSync(`.env.${name}`, "utf8");
    console.log(data, "data==");
    data.split("\n").forEach(function (item) {
      const [key, value] = item.split("=");
      if (key) {
        process.env[key.trim()] = value?.trim();
      }
    });
  } catch (error) {
    console.error(`Failed to load environment variables from file ${name}`);
  }
};

rewriteEnv();
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
