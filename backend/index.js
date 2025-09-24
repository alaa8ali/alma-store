require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { setupWebhooks } = require('./routes/webhook');
const { setupQueueProcessor } = require('./services/queue');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Setup webhooks
setupWebhooks(app);

// Setup queue processor
setupQueueProcessor();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


