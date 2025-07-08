const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from current folder
app.use(express.static(__dirname));

// Serve index.html from current folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// USDT Balance Check (TRON)
app.get('/api/balance', async (req, res) => {
  try {
    const walletAddress = 'TGz33mQsB6Bnyw86VLHMtbnAfNc9ooVCrs';
    const apiKey = 'dc44014e-6887-4ba0-a7b7-8ecf6a6ac086';

    const response = await axios.get(`https://api.trongrid.io/v1/accounts/${walletAddress}`, {
      headers: {
        'TRON-PRO-API-KEY': apiKey
      }
    });

    const balance = response.data.data[0].balance / 1_000_000;  // In TRX
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
