import { useCallback, useEffect, useMemo } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { WalletTypeEnum } from "@aelf-web-login/wallet-adapter-base";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { PortkeyDid } from "@aelf-web-login/wallet-adapter-bridge";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export interface ExtraInfoForPortkeyAA {
  publicKey: string;
  portkeyInfo: PortkeyDid.DIDWalletInfo & {
    accounts: TAelfAccounts;
    nickName: string;
  };
}

export type TAelfAccounts = {
  AELF?: string;
  tDVV?: string;
  tDVW?: string;
};

export default function Assets() {
  const { walletType, walletInfo } = useConnectWallet();

  const navigate = useNavigate();
  const portkeyAAInfo = useMemo(() => {
    return walletInfo?.extraInfo as ExtraInfoForPortkeyAA;
  }, [walletInfo?.extraInfo]);

  const handleDeleteAccount = useCallback(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (walletType !== WalletTypeEnum.aa) {
      navigate("/");
    }
  }, [walletType, navigate]);

  if (
    walletType !== WalletTypeEnum.aa ||
    !portkeyAAInfo?.portkeyInfo?.pin ||
    !portkeyAAInfo?.portkeyInfo?.chainId
  ) {
    return null;
  }

  return (
    <div className={"my-asset-wrapper"}>
      {portkeyAAInfo?.portkeyInfo?.pin && (
        <PortkeyDid.PortkeyAssetProvider
          originChainId={portkeyAAInfo?.portkeyInfo?.chainId}
          pin={portkeyAAInfo?.portkeyInfo?.pin}>
          <PortkeyDid.Asset
            isShowRamp={false}
            isShowRampBuy={false}
            isShowRampSell={false}
            backIcon={<LeftOutlined />}
            onOverviewBack={() => navigate("/")}
            onLifeCycleChange={(lifeCycle) => {
              console.log(lifeCycle, "onLifeCycleChange");
            }}
            onDeleteAccount={handleDeleteAccount}
          />
        </PortkeyDid.PortkeyAssetProvider>
      )}
    </div>
  );
}
