import { NetworkEnum, TChainId } from "@aelf-web-login/wallet-adapter-base";
import { ChainId } from '@portkey/types';

export const CHAIN_ID = "tDVV" satisfies TChainId;

export const NETWORK_TYPE = NetworkEnum.MAINNET;
export const RPC_SERVER_AELF = "https://aelf-test-node.aelf.io";
export const RPC_SERVER_TDVV = "https://tdvv-test-node.aelf.io";
export const RPC_SERVER_TDVW = "";
export const GRAPHQL_SERVER =
  "https://dapp-aa-portkey.portkey.finance/Portkey_V2_DID/PortKeyIndexerCASchema/graphql";

export const CONNECT_SERVER = "https://auth-aa-portkey.portkey.finance";

export const PORTKEY_SERVER_URL = "https://aa-portkey.portkey.finance";
export const TELEGRAM_BOT_ID = import.meta.env.VITE_TELEGRAM_BOT_ID;

export const ETRANSFER_CONFIG = {
  depositConfig: {
    defaultReceiveToken: "ELF",
    supportReceiveTokens: ["ELF"],
    defaultChainId: "tDVV" as ChainId,
    defaultNetwork: "ETH",
  },
  etransferAuthUrl: "https://app.etransfer.exchange",
  etransferUrl: "https://app.etransfer.exchange",
};


export enum SupportedELFChainId {
  AELF = 'AELF',
  tDVV = 'tDVV',
}

export const SupportedChainId = {
  mainChain: SupportedELFChainId.AELF,
  sideChain: SupportedELFChainId.tDVV,
};