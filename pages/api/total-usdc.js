import axios from 'axios';

const ADDRESS = '0x0BDcA19c9801bb484285362fD5dd0c94592c874C';

export default async function handler(req, res) {
  try {
    const API_KEY = process.env.BASESCAN_API_KEY;
    const url = `https://api.basescan.org/api?module=account&action=tokentx&address=${ADDRESS}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    const transactions = response.data.result;

    let totalUSDC = 0;

    for (let tx of transactions) {
      if (
        tx.to.toLowerCase() === ADDRESS.toLowerCase() &&
        tx.tokenSymbol === 'USDC'
      ) {
        totalUSDC += Number(tx.value) / 10 ** 6;
      }
    }

    res.status(200).json({ total: totalUSDC });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch USDC data' });
  }
}
