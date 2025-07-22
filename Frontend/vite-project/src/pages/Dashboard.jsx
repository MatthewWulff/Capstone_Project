import { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom"
import api from "../api";

export default Dashboard(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [balance, setBalance] = useState(0)
    const [amount, setAmount] = useState('')


    useEffect(()=>{
        const fetchBalance = async ()=> {
            const res = await api.get(`/users/${id}`)
            setBalance(res.data.balance)
        }
        fetchBalance()
    }, [id])

    const deposit = async() => {
        if(!amount){
            return
        }
        const res = await api.post(`/users/${id}/deposit`, {amount: Number(amount)})
        setBalance(res.data.balance)
        setAmount('')
    }
}
    const withdraw = async()=>{
        if(!amount){
            return
        }
        const res = await api.post(`/users/${id}/withdraw`, {amount: Number(amount)})
        setBalance(res.data.balance)
        setAmount('')
    }

    return (
        <>
            <h2>Dashboard</h2>
            <h3>Balance: ${balance}</h3>
            <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e)=> setAmount(e.target.value)}/>
            <div>
                <button onClick={deposit}>Deposit</button>
                <button onClick={withdraw}>Withdraw</button>
            </div>
            <button onClick={()=> navigate(`/transactions/${id}`)}>View transactions</button>


        </>
    )
