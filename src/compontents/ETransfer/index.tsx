import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import EtransferModal from "../EtransferModal";

import {
  handleErrorMessage,
  setLoading,
  singleMessage,
} from "@portkey/did-ui-react";
import { useQueryAuthToken } from "./useQueryAuthToken";

export interface IETransferInstance {
  onDeposit: () => Promise<void>;
}

const ETransfer = forwardRef((props: any, ref) => {
  const [etransferOpen, setEtransferOpen] = useState<boolean>();
  console.log(props, "props===");
  const { getAuthToken } = useQueryAuthToken();

  const onDeposit = useCallback(async () => {
    try {
      setLoading(true);
      await getAuthToken();
      setLoading(false);

      setEtransferOpen(true);
    } catch (error) {
      singleMessage.error(handleErrorMessage(error, "something error"));
      setLoading(false);
    }
  }, [getAuthToken]);

  useImperativeHandle(ref, () => ({
    onDeposit,
  }));

  return (
    <div>
      <EtransferModal
        open={etransferOpen}
        onClose={() => setEtransferOpen(false)}
      />
    </div>
  );
});

export default ETransfer;
