import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { useEffect } from "react";
import { PortkeyBridgeEventReceiveInstance } from "../../bridgeEvent/on";
import { PortkeyBridgeEventPost } from "../../bridgeEvent/dispatch";
import { NotificationEvents } from "../../bridgeEvent/constants";

export default function BridgeUpdater() {
  const provider = useConnectWallet();

  useEffect(() => {
    if (!window.PortkeyBridge) window.PortkeyBridge = {};
    console.log(provider, "NotificationEvents ==provider===");
    window.PortkeyBridge = provider;
  }, [provider]);

  useEffect(() => {
    PortkeyBridgeEventPost.connectStatueChanged(provider.isConnected);
  }, [provider.isConnected]);

  useEffect(() => {
    PortkeyBridgeEventPost.walletInfoChanged(provider.walletInfo);
  }, [provider.walletInfo]);

  useEffect(() => {
    PortkeyBridgeEventPost.LockStatusChanged(provider.isLocking);
  }, [provider.isLocking]);

  useEffect(() => {
    PortkeyBridgeEventPost.WalletTypeChanged(provider.walletType);
  }, [provider.walletType]);

  useEffect(() => {
    const r1 = PortkeyBridgeEventReceiveInstance.on(
      NotificationEvents.connectChanged,
      (event) => {
        console.log(event, "NotificationEvents.connectChanged");
      }
    );
    const r2 = PortkeyBridgeEventReceiveInstance.on(
      NotificationEvents.lockStatus,
      (event) => {
        console.log(event, "NotificationEvents.lockStatus");
      }
    );
    const r3 = PortkeyBridgeEventReceiveInstance.on(
      NotificationEvents.walletChanged,
      (event) => {
        console.log(event, "NotificationEvents.walletChanged");
      }
    );
    const r4 = PortkeyBridgeEventReceiveInstance.on(
      NotificationEvents.walletTypeChanged,
      (event) => {
        console.log(event, "NotificationEvents.walletTypeChanged");
        r4.remove();
      }
    );
    return () => {
      r1.remove();
      r2.remove();
      r3.remove();
      r4.remove();
    };
  }, []);

  return null;
}
