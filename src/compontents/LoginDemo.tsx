import { useEffect, useRef } from "react";
import { Button, message, Divider, Flex } from "antd";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { WalletTypeEnum } from "@aelf-web-login/wallet-adapter-base";
import { useNavigate } from "react-router-dom";
import ETransfer, { IETransferInstance } from "./ETransfer";

const LoginDemo: React.FC = () => {
  const {
    connectWallet,
    disConnectWallet,
    walletInfo,
    lock,
    isLocking,
    walletType,
    isConnected,
    loginError,
  } = useConnectWallet();
  console.log("LoginDemo init----------");

  const transferRef = useRef<IETransferInstance>();

  const onConnectBtnClickHandler = async () => {
    try {
      const rs = await connectWallet();
      console.log("rs", rs);
    } catch (e: any) {
      console.log(e, "===");
      // message.error(e.nativeError?.message ?? e.message);
    }
  };

  useEffect(() => {
    if (!loginError) {
      return;
    }
    message.error(loginError.nativeError?.message ?? loginError.message);
  }, [loginError]);

  const onDisConnectBtnClickHandler = () => {
    disConnectWallet();
  };

  const navigate = useNavigate();

  return (
    <div>
      <Flex gap={"small"}>
        <Button
          type="primary"
          onClick={onConnectBtnClickHandler}
          disabled={isConnected}>
          {isLocking ? "unlock" : "connect"}
        </Button>
        {walletType === WalletTypeEnum.aa && (
          <Button type="primary" onClick={lock} disabled={!walletInfo}>
            lock
          </Button>
        )}
        <Button
          type="primary"
          onClick={onDisConnectBtnClickHandler}
          disabled={!isConnected}>
          disconnect
        </Button>

        {walletType === WalletTypeEnum.aa && !isLocking && (
          <Button type="primary" onClick={() => navigate("/assets")}>
            Go Asset page
          </Button>
        )}

        {isConnected && (
          <Button
            type="primary"
            onClick={() => transferRef.current?.onDeposit()}>
            deposit
          </Button>
        )}
      </Flex>
      <ETransfer ref={transferRef} />

      <div>
        walletInfo:
        <pre style={{ overflow: "auto", height: "300px" }}>
          {JSON.stringify(walletInfo, undefined, 4)}
        </pre>
      </div>
      <div>walletType:{walletType}</div>
      <Divider />
    </div>
  );
};

export default LoginDemo;
