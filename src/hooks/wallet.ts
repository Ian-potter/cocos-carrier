import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { TAelfAccounts, SingleMessage } from "@etransfer/ui-react";
import { handleWebLoginErrorMessage } from "@etransfer/utils";
import { useMemo, useCallback } from "react";
import LOGIN_CONFIG from "../constants/config/login.config";

const { SupportedChainId } = LOGIN_CONFIG;

export function useIsLogin() {
  const { isConnected, walletInfo } = useConnectWallet();
  return useMemo(() => {
    return isConnected && !!walletInfo;
  }, [isConnected, walletInfo]);
}

export function useLogin() {
  const { connectWallet } = useConnectWallet();
  const isLogin = useIsLogin();

  return useCallback(async () => {
    if (isLogin) return;

    try {
      await connectWallet();
    } catch (error) {
      SingleMessage.error(handleWebLoginErrorMessage(error));
    }
  }, [connectWallet, isLogin]);
}

export function useGetAccount() {
  const { walletInfo } = useConnectWallet();
  const isLogin = useIsLogin();

  // WalletInfo TAelfAccounts ExtraInfoForDiscover | ExtraInfoForPortkeyAA | ExtraInfoForNightElf;
  return useMemo(() => {
    if (!isLogin) return undefined;

    const accounts: TAelfAccounts = {
      [SupportedChainId.mainChain]:
        "ELF_" + walletInfo?.address + "_" + SupportedChainId.mainChain,
      [SupportedChainId.sideChain]:
        "ELF_" + walletInfo?.address + "_" + SupportedChainId.sideChain,
    };

    return accounts;
  }, [isLogin, walletInfo]);
}
