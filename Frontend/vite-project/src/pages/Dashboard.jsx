import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await api.get(`balance/${id}`);
      setBalance(res.data.balance);
    };
    fetchBalance();
  }, [id]);

  const deposit = async () => {
    if (!amount) {
      return;
    }
    const res = await api.post(`/deposit/${id}`, { amount: Number(amount) });
    setBalance(res.data.balance);
    setAmount("");
  };

  const withdraw = async () => {
    if (!amount) return;
    try {
      const res = await api.post(`/withdraw/${id}`, { amount: Number(amount) });
      setBalance(res.data.balance);
      setAmount("");
      setMessage(res.data.message || "Withdrawal successful");
    } catch (err) {
      console.error("Withdraw error:", err.response?.data?.message);
      setMessage(err.response?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <>
      <h2>Dashboard</h2>
      <h3>
        <h3>Balance: ${balance}</h3>
        {message && <p>{message}</p>}
      </h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div>
        <button onClick={deposit}>Deposit</button>
        <button onClick={withdraw}>Withdraw</button>
      </div>
      <button onClick={() => navigate(`/transactions/${id}`)}>
        View transactions
      </button>
    </>
  );
}
