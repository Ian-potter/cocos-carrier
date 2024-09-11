import { GetCAHolderByManagerParams } from "@portkey/services";
import { PortkeyDid } from "@aelf-web-login/wallet-adapter-bridge";
import { TChainId } from "@aelf-web-login/wallet-adapter-base";
import { WalletTypeEnum } from "@etransfer/ui-react";
import { ExtraInfoForPortkeyAA, WalletInfo } from "../types/wallet";
import LOGIN_CONFIG from "../constants/config/login.config";

export const getCaHashAndOriginChainIdByWallet = async (
  walletInfo: WalletInfo,
  walletType: WalletTypeEnum
): Promise<{ caHash: string; originChainId: TChainId }> => {
  if (walletType === WalletTypeEnum.unknown)
    return {
      caHash: "",
      originChainId: LOGIN_CONFIG.CHAIN_ID,
    };

  let caHash, originChainId;
  if (walletType === WalletTypeEnum.discover) {
    const res = await PortkeyDid.did.services.getHolderInfoByManager({
      caAddresses: [walletInfo?.address],
    } as unknown as GetCAHolderByManagerParams);
    const caInfo = res[0];
    caHash = caInfo?.caHash;
    originChainId = caInfo?.chainId as TChainId;
  } else if (walletType === WalletTypeEnum.aa) {
    const portkeyAAInfo = walletInfo?.extraInfo as ExtraInfoForPortkeyAA;
    caHash = portkeyAAInfo.portkeyInfo.caInfo.caHash;
    originChainId = portkeyAAInfo.portkeyInfo.chainId;
  }

  return {
    caHash: caHash || "",
    originChainId: originChainId || LOGIN_CONFIG.CHAIN_ID,
  };
};
