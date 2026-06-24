import { useState } from "react";
import { connectWallet } from "./stellar";

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnectWallet = async () => {
    const address = await connectWallet();

    if (address) {
      alert("✅ Wallet Connected Successfully");
      setWalletAddress(address);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🚀 Stellar Wallet App</h1>

      <button onClick={handleConnectWallet}>
        Connect Wallet
      </button>

      {walletAddress && (
        <div>
          <h3>Connected Wallet:</h3>
          <p>{walletAddress}</p>
        </div>
      )}
    </div>
  );
}

export default App;
