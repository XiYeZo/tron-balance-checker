const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = 3000;
const WALLET_ADDRESS = 'TGz33mQsB6Bnyw86VLHMtbnAfNc9ooVCrs';
const API_KEY = 'dc44014e-6887-4ba0-a7b7-8ecf6a6ac086';
const POLLING_INTERVAL = 5 * 60 * 1000; // 5 minutes

let totalUSDT = 0;

// Function to fetch USDT TRC20 balance
async function fetchUSDTBalance() {
  try {
    const response = await axios.get(
      `https://api.trongrid.io/v1/accounts/${WALLET_ADDRESS}/transactions/trc20?limit=200&only_confirmed=true`,
      {
        headers: {
          'TRON-PRO-API-KEY': API_KEY,
        },
      }
    );

    const transactions = response.data.data;

    let total = 0;
    transactions.forEach((tx) => {
      if (
        tx.to === WALLET_ADDRESS &&
        tx.token_info.symbol === 'USDT'
      ) {
        total += parseFloat(tx.value) / Math.pow(10, tx.token_info.decimals);
      }
    });

    totalUSDT = total;
    console.log(`Total USDT received: ${totalUSDT}`);
  } catch (error) {
    console.error('Error fetching USDT transactions:', error.message);
  }
}

// Initial Fetch
fetchUSDTBalance();
// Auto Fetch Every 5 Minutes
setInterval(fetchUSDTBalance, POLLING_INTERVAL);

// Simple API Endpoint
app.get('/balance', (req, res) => {
  res.json({ totalUSDT });
});

app.listen(PORT, () => {
  console.log(`Balance API running on http://localhost:${PORT}/balance`);
});
