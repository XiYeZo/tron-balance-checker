async function checkBalance() {
  const address = 'TGz33mQsB6Bnyw86VLHMtbnAfNc9ooVCrs';
  const apiKey = 'dc44014e-6887-4ba0-a7b7-8ecf6a6ac086';
  const usdtContract = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'; // USDT TRC20 Contract

  const balanceElement = document.getElementById('balance');
  balanceElement.innerText = 'Loading...';

  try {
    const response = await fetch(`https://api.trongrid.io/v1/accounts/${address}/tokens?limit=200`, {
      headers: { 'TRON-PRO-API-KEY': apiKey }
    });
    const data = await response.json();

    const usdtToken = data.data.find(token => token.token_id === usdtContract);

    if (usdtToken) {
      const balance = usdtToken.balance / 1e6; // USDT has 6 decimals
      balanceElement.innerText = `Current Balance: ${balance} USDT`;
    } else {
      balanceElement.innerText = 'USDT not found on this wallet.';
    }
  } catch (error) {
    balanceElement.innerText = 'Error fetching balance.';
  }
}
