import { useEffect, useState } from 'react';

export default function Home() {
  const [usdc, setUsdc] = useState(null);

  const fetchUSDC = async () => {
    try {
      const res = await fetch('/api/total-usdc');
      const data = await res.json();
      setUsdc(data.total.toFixed(2));
    } catch {
      setUsdc('Error');
    }
  };

  useEffect(() => {
    fetchUSDC();
    const interval = setInterval(fetchUSDC, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'Arial' }}>
      <h1>Total USDC Received</h1>
      <h2>{usdc === null ? 'Loading...' : `${usdc} USDC`}</h2>
    </main>
  );
}
