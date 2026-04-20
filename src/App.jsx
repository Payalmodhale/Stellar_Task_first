import { useState } from "react";
import { createAccount, getBalance, sendXLM } from "./stellar";

export default function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState([]);
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("");

  const make = () => setAccount(createAccount());

  const check = async () => {
    if (!account) return alert("Create wallet first");
    setBalance(await getBalance(account.publicKey));
  };

  const send = async () => {
    if (!destination.trim()) return alert("Enter address");
    try {
      setStatus("Sending...");
      await sendXLM(account.secret, destination);
      setStatus("Success");
    } catch {
      setStatus("Failed");
    }
  };

  return (
    <div className="container">
      <h1>🚀 Stellar Wallet App</h1>

      <button onClick={make}>Create Wallet</button>
      <button onClick={check}>Check Balance</button>

      {account && (
        <>
          <p><b>Public Key:</b> {account.publicKey}</p>
          <p><b>Secret Key:</b> {account.secret}</p>
        </>
      )}

      {balance.map((b, i) => (
        <p key={i}>{b.balance} XLM</p>
      ))}

      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination Address"
      />

      <button onClick={send}>Send XLM</button>

      <p>Status: {status}</p>
    </div>
  );
}
