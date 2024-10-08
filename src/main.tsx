import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AssetsPage from "./assetsPage/index.tsx";
import "./index.css";
import WebLoginConfigProvider from "./provider/weblogin.tsx";
import ETransferLayout from "./provider/ETransferLayout.tsx";
import ReactGA from "react-ga4";
import LOGIN_CONFIG from "./constants/config/login.config";
import InAppPurchase from "./page-components/InAppPurchase/index.tsx";

// when MAINNET and production
if (
  process.env.NODE_ENV === "production" &&
  LOGIN_CONFIG.NETWORK_TYPE === "MAINNET"
) {
  // Replace with your own Measurement Id
  ReactGA.initialize("G-1TNN5WRTQ3");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/assets",
    element: <AssetsPage />,
  },
  {
    path: "/in-app-purchase",
    element: <InAppPurchase />,
  },
  {
    path: "*",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebLoginConfigProvider>
      <ETransferLayout>
        <RouterProvider router={router} />
      </ETransferLayout>
    </WebLoginConfigProvider>
  </React.StrictMode>
);
