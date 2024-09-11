import "./App.css";
import { Tabs, TabsProps } from "antd";

import LoginDemo from "./compontents/LoginDemo";
import AccountDemo from "./compontents/AccountDemo";
import ContractDemo from "./compontents/ContractDemo";
import SignatureDemo from "./compontents/SignatureDemo";
import UtilsDemo from "./compontents/UtilsDemo";
import BridgeUpdater from "./compontents/BridgeUpdater";

const items: TabsProps["items"] = [
  {
    key: "AccountDemo",
    label: "AccountDemo",
    children: <AccountDemo />,
  },
  {
    key: "ContractDemo",
    label: "ContractDemo",
    children: <ContractDemo />,
  },
  {
    key: "SignatureDemo",
    label: "SignatureDemo",
    children: <SignatureDemo />,
  },
  {
    key: "UtilsDemo",
    label: "UtilsDemo",
    children: <UtilsDemo />,
  },
];

const App: React.FC = () => {
  return (
    <div>
      {/* <button onClick={OnInpageClick}>inpage</button>
      <button onClick={OnConentClick}>conent</button> */}

      <LoginDemo />
      <BridgeUpdater />
      <Tabs defaultActiveKey="AccountDemo" items={items} />
    </div>
  );
};

export default App;
