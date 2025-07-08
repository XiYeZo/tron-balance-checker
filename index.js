async function checkBalance() {
  const address = 'TGz33mQsB6Bnyw86VLHMtbnAfNc9ooVCrs';
  const apiKey = 'dc44014e-6887-4ba0-a7b7-8ecf6a6ac086';
  const usdtContract = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'; // USDT TRC20 Contract

  try {
    const response = await fetch(`https://api.trongrid.io/v1/accounts/${address}/tokens?limit=200`, {
      headers: { 'TRON-PRO-API-KEY': apiKey }
    });
    const data = await response.json();

    const usdtToken = data.data.find(token => token.token_id === usdtContract);

    if (usdtToken) {
      const balance = usdtToken.balance / 1e6; // USDT has 6 decimals
      document.getElementById('balance').innerText = `Current Balance: ${balance} USDT`;
    } else {
      document.getElementById('balance').innerText = 'USDT not found on this wallet.';
    }
  } catch (error) {
    document.getElementById('balance').innerText = 'Error fetching balance.';
  }
}
