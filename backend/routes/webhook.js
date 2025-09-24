const crypto = require("crypto");
const { processMessage } = require("../services/messageProcessor");

function verifyHMAC(secret, body, signature) {
  const h = crypto.createHmac("sha256", secret).update(JSON.stringify(body)).digest("hex");
  return h === signature;
}

const setupWebhooks = (app) => {
  app.post("/webhook/whatsapp", (req, res) => {
    // TODO: Implement WhatsApp webhook verification
    // const signature = req.headers["x-hub-signature"];
    // if (!verifyHMAC(process.env.WHATSAPP_APP_SECRET, req.body, signature)) {
    //   return res.sendStatus(403);
    // }
    console.log("WhatsApp Webhook received:", JSON.stringify(req.body, null, 2));
    processMessage("whatsapp", req.body);
    res.sendStatus(200);
  });

  app.post("/webhook/telegram", (req, res) => {
    const secret = req.query.secret;
    if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
      return res.sendStatus(403);
    }
    console.log("Telegram Webhook received:", JSON.stringify(req.body, null, 2));
    processMessage("telegram", req.body);
    res.sendStatus(200);
  });

  app.post("/opal/tools/create-order", (req, res) => {
    // TODO: Implement Opal HMAC verification if needed
    console.log("Opal Create Order received:", JSON.stringify(req.body, null, 2));
    // Logic to create order
    res.json({ order_id: "mock_order_id", status: "pending" });
  });

  app.post("/opal/tools/send-message", (req, res) => {
    console.log("Opal Send Message received:", JSON.stringify(req.body, null, 2));
    // Logic to send message
    res.sendStatus(200);
  });

  app.post("/drivers/:id/update-location", (req, res) => {
    console.log("Driver location update received:", JSON.stringify(req.body, null, 2));
    // Logic to update driver location
    res.sendStatus(200);
  });
};

module.exports = { setupWebhooks };


