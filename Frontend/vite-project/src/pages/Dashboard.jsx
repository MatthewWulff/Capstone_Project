import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const { id } = useParams(); // get id for url 
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const[newPin, setNewPin] = useState('')


  //calls backend to fetch user balance and updates state to show new balance
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await api.get(`balance/${id}`);
      setBalance(res.data.balance);
    };
    fetchBalance();
  }, [id]);
  const updatePin = async () => {
    await api.put(`/update/${id}`, {pin:newPin})
    alert("Updated")
  }
  //deposit amount to balance
  const deposit = async () => {
    if (!amount) {
      return;
    }
    const res = await api.post(`/deposit/${id}`, { amount: Number(amount) });
    setBalance(res.data.balance);
    setAmount("");
  };


  //withdraw amount entered and updates balance 
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
  //deletes account
  const deleteAccount = async ()=>{
    const res = await api.delete(`/delete/${id}`)
    setMessage(res.data.message)
    navigate("/")
  }


  return (
    <div className="container">
      <h2>Dashboard</h2>
      
        <h3>Balance: ${balance}</h3>
        {message && <p>{message}</p>}
      
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
      <div></div>
      <button onClick={deleteAccount }>Delete Account</button>
      <div></div>
      <input
      placeholder="New Pin"
      value = {newPin}
      onChange={(e) => setNewPin(e.target.value)}/>
      <button onClick={updatePin}>Update PIN</button>
    </div>
  );
}
