import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";

function App() {
  const [usdc, setUsdc] = useState<string | null>(null);

  useEffect(() => {
    // Fetch total USDC (replace with your real endpoint)
    fetch("/api/total-usdc")
      .then((res) => res.json())
      .then((data) => setUsdc(data.total.toFixed(2)))
      .catch(() => setUsdc("Error"));

    // Tell Warpcast the frame is ready
    sdk.actions.ready();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-2xl font-semibold mb-4">Farcaster Pro Subscription</h1>
      <p className="text-3xl font-bold text-blue-600">
        {usdc === null ? "Loading..." : `${usdc} USDC`}
      </p>
    </div>
  );
}

export default App;
