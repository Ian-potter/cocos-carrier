import {
  ComponentStyle,
  Deposit,
  ETransferDepositProvider,
  useScreenSize,
} from "@etransfer/ui-react";
import { PortkeyModal, TelegramPlatform } from "@portkey/did-ui-react";
import "./index.css";
import { useMemo } from "react";
export default function EtransferModal({
  open,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const { isPadPX } = useScreenSize();
  const isMobile = useMemo(
    () => isPadPX || TelegramPlatform.isTelegramPlatform(),
    [isPadPX]
  );
  const height = useMemo(() => (isMobile ? "80%" : 800), [isMobile]);
  console.log(isMobile, "isMobile===");
  return (
    <PortkeyModal
      // type="drawer"
      height={height}
      wrapClassName="deposit-wrapper"
      placement={"bottom"}
      open={open}
      zIndex={99}
      title="Buy ELF"
      onClose={onClose}
      footer={null}>
      <ETransferDepositProvider>
        <Deposit
          // className={isMobile ? styles.mobileDepositWrap : styles.pcDepositWrap}
          componentStyle={isMobile ? ComponentStyle.Mobile : ComponentStyle.Web}
        />
      </ETransferDepositProvider>
    </PortkeyModal>
  );
}
