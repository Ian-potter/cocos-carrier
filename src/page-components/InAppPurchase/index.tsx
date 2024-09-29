import { Button, Col, Divider, Input, Row, Select, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import ReactJson from "react-json-view";
import qs from "querystring";
import { randomId } from "@portkey/did-ui-react";
const CONFIG = {
  TESTNET: {
    networkType: "TESTNET",
    // TODO
    serviceUrl: "/in-app-purchase-testnet", //  "https://game-station-test.portkey.finance",
  },
  MAINNET: {
    networkType: "MAINNET",
    // TODO
    serviceUrl: "/in-app-purchase-mainnet", // "https://game-station.portkey.finance",
  },
};

const DEFAULT_HEADERS = {
  Accept: "text/plain;v=1.0",
  "Content-Type": "application/json",
};

const OPTIONS = Object.values(CONFIG).map((item) => ({
  label: item.networkType,
  value: item.networkType,
}));

const DEFAULT_MONITOR_INFO = {
  toAddress: "zALNGViyR7NbJyyKMfcoY7R58RnRNyM7cUgQeWVUR4SLCHfmE",
  callbackUrl:
    "https://6486-2408-821b-8819-4490-7914-3a4b-5ff8-751b.ngrok-free.app/purchase/callback",
};

const DEFAULT_UPDATE_MONITOR_INFO = {
  reviseToAddress: "zALNGViyR7NbJyyKMfcoY7R58RnRNyM7cUgQeWVUR4SLCHfmE",
  reviseCallbackUrl:
    "https://6486-2408-821b-8819-4490-7914-3a4b-5ff8-751b.ngrok-free.app/purchase/callback",
};

const getAppId = () => {
  let appId = localStorage.getItem("appId");
  if (!appId) {
    appId = randomId();
    localStorage.setItem("appId", appId);
  }
  return appId;
};

export default function InAppPurchase() {
  const [config, setConfig] = useState(CONFIG["TESTNET"]);
  const [appId, setAppId] = useState(getAppId());
  const [guardKey, setGuardKey] = useState("");
  const [monitorInfo, setMonitorInfo] = useState(DEFAULT_MONITOR_INFO);
  const [configList, setConfigList] = useState();

  const [updateMdonitorInfo, setUpdateMonitorInfo] = useState({
    ...DEFAULT_MONITOR_INFO,
    ...DEFAULT_UPDATE_MONITOR_INFO,
  });
  const handleChange = useCallback((value: string) => {
    setConfig(CONFIG[value as keyof typeof CONFIG]);
  }, []);

  const onCreatGuardKey = useCallback(async () => {
    const guardInfo = localStorage.getItem("guardInfo");
    if (guardInfo) {
      const _appId = guardInfo.split("-")[0];
      if (_appId === appId) {
        const guardKey = guardInfo.split("-")[1];
        setGuardKey(guardKey);
        return;
      }
    }
    const result = await fetch(`${config.serviceUrl}/api/guardKey/create`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        appId,
      }),
    }).then((res) => res.json());

    console.log(result, "result==");
    const guardKey = result.data;
    localStorage.setItem("guardInfo", `${appId}-${guardKey}`);
    setGuardKey(guardKey);
  }, [appId, config.serviceUrl]);

  useEffect(() => {
    setMonitorInfo((v) => ({
      ...v,
      appId,
    }));
  }, [appId]);

  useEffect(() => {
    setUpdateMonitorInfo((v) => ({
      ...v,
      ...monitorInfo,
    }));
  }, [monitorInfo]);

  const onAddMonitorInfo = useCallback(async () => {
    const signatureResult = await fetch(
      `${config.serviceUrl}/api/tools/encrypt/add?${qs.stringify({
        ...monitorInfo,
        key: guardKey,
      })}`
    ).then((res) => res.json());

    console.log(signatureResult, "getSignature===");
    const signature = signatureResult.data.signature;

    const result = await fetch(`${config.serviceUrl}/api/config/add`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        data: monitorInfo,
        signature,
      }),
    }).then((res) => res.json());

    console.log(result, "onAddMonitorInfo=result==");
  }, [config.serviceUrl, guardKey, monitorInfo]);

  const onUpdateMonitorInfo = useCallback(async () => {
    const signatureResult = await fetch(
      `${config.serviceUrl}/api/tools/encrypt/update?${qs.stringify({
        ...updateMdonitorInfo,
        key: guardKey,
      })}`
    ).then((res) => res.json());
    const signature = signatureResult.data.signature;

    const result = await fetch(`${config.serviceUrl}/api/config/update`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        data: updateMdonitorInfo,
        signature,
      }),
    }).then((res) => res.json());

    console.log(result, "onUpdateMonitorInfo=result==");
  }, [config.serviceUrl, guardKey, updateMdonitorInfo]);

  const onGetList = useCallback(async () => {
    const signatureResult = await fetch(
      `${config.serviceUrl}/api/tools/encrypt/getList?${qs.stringify({
        appId,
        key: guardKey,
      })}`
    ).then((res) => res.json());
    const signature = signatureResult.data.signature;

    const result = await fetch(`${config.serviceUrl}/api/config/getList`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        data: { appId },
        signature,
      }),
    }).then((res) => res.json());

    console.log(result, "onGetList=result==");
    setConfigList(result.data);
  }, [appId, config.serviceUrl, guardKey]);

  return (
    <div>
      <Row>
        <Select
          defaultValue="TESTNET"
          style={{ width: 300 }}
          onChange={handleChange}
          options={OPTIONS}
        />
      </Row>
      <Divider />
      <Row>
        <Col>NetworkType:</Col>
        <Col>{config.networkType}</Col>
      </Row>
      <Row align={"middle"}>
        <Space>
          <Col>ServiceUrl:</Col>
          <Col>{config.serviceUrl}</Col>
          <Button
            type="primary"
            onClick={() => {
              window.open(`${config.serviceUrl}/swagger/index.html`);
            }}>
            Go Swagger
          </Button>
        </Space>
      </Row>
      <Divider />
      <Row>
        <Col>
          <Input.Group compact>
            <Input
              style={{ width: 200 }}
              value={appId}
              onChange={(e) => {
                setAppId(e.target.value);
                localStorage.setItem("appId", e.target.value);
              }}
            />
            <Button type="primary" onClick={onCreatGuardKey}>
              Create GuardKey
            </Button>
          </Input.Group>
        </Col>
      </Row>
      {guardKey && (
        <Row>
          <Col>
            <Space>
              <span>guardKey:</span>
              <span>{guardKey}</span>
            </Space>
          </Col>
        </Row>
      )}
      <Divider />
      <Row>
        <h3>MonitorInfo:</h3>
        <Space>
          <ReactJson
            src={monitorInfo}
            onEdit={(edit) => {
              setMonitorInfo(edit.updated_src as typeof monitorInfo);
            }}
          />

          <Button type="primary" onClick={onAddMonitorInfo}>
            AddMonitorInfo
          </Button>
        </Space>
      </Row>

      <Divider />
      <Row>
        <h3>Update MonitorInfo:</h3>
        <Space>
          <ReactJson
            src={updateMdonitorInfo}
            onEdit={(edit) => {
              setMonitorInfo(edit.updated_src as typeof monitorInfo);
            }}
          />

          <Button type="primary" onClick={onUpdateMonitorInfo}>
            UpdateMonitorInfo
          </Button>
        </Space>
      </Row>

      <Row>
        <Space>
          <Button type="primary" onClick={onGetList}>
            GetList
          </Button>
          {configList && <ReactJson src={configList} />}
        </Space>
      </Row>
    </div>
  );
}
