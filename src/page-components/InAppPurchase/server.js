// 103.190.179.16
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.json());

app.listen(3333, async () => {
  console.log("Webhook server is listening on port 3333");
});

const checkCallback = async (data) => {
  fetch("https://game-station-test.portkey.finance/api/tools/checkCallback", {
    method: "POST",
    headers: {
      Accept: "text/plain;v=1.0",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx: data.Data.Tx,
      toAddress: data.Data.ToAddress,
      fromAddress: data.Data.FromAddress,
      symbol: data.Data.Symbol,
      amount: data.Data.Amount,
      memo: data.Data.Memo,
      key: "p9+1k7z7EfSbtartwFEG77Wwi8XHnUjmlmzd2d65vdg=",
      signature: data.Signature,
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log("checkCallback:", json))
    .catch((err) => console.error("error:" + err));
};

app.post("/purchase/callback", (req, res) => {
  try {
    console.log("==request", req?.body);

    // res.sendStatus(200);
    res.json({ data: true });
    checkCallback(req?.body);
  } catch (error) {
    console.error("Error handling webhook update:", error);
    res.sendStatus(500);
  }
});

app.get("/server/test", (req, res) => {
  res.send("work!");
  console.log("/server/test", req);
});
