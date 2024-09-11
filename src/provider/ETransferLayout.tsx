"use client";

import React, { useEffect } from "react";
import {
  ETransferConfig,
  ETransferLayoutProvider,
  ETransferStyleProvider,
  NetworkType,
} from "@etransfer/ui-react";
import "@etransfer/ui-react/dist/assets/index.css";
import LOGIN_CONFIG from "../constants/config/login.config";

const { ETRANSFER_CONFIG, NETWORK_TYPE } = LOGIN_CONFIG;

export default function ETransferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    ETransferConfig.setConfig({
      ...ETRANSFER_CONFIG,
      authorization: {
        jwt: "", // ETransfer Auth Token
      },
      networkType: NETWORK_TYPE as NetworkType,
    });
  }, []);

  return (
    <ETransferStyleProvider>
      <ETransferLayoutProvider>{children}</ETransferLayoutProvider>
    </ETransferStyleProvider>
  );
}
