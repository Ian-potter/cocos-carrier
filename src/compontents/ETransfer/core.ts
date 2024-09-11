import { eTransferCore as _eTransferCore } from "@etransfer/core";
import { IStorageSuite } from "@etransfer/types";
import LOGIN_CONFIG from "../../constants/config/login.config";

class Store implements IStorageSuite {
  async getItem(key: string) {
    return localStorage.getItem(key);
  }
  async setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }
  async removeItem(key: string) {
    return localStorage.removeItem(key);
  }
}

export const eTransferCore = _eTransferCore;

eTransferCore.init({
  etransferUrl: LOGIN_CONFIG.ETRANSFER_CONFIG.etransferUrl,
  etransferAuthUrl: LOGIN_CONFIG.ETRANSFER_CONFIG.etransferAuthUrl,
  etransferSocketUrl: LOGIN_CONFIG.ETRANSFER_CONFIG.etransferUrl,
  storage: new Store(),
});
