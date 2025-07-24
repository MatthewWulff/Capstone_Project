import {useParams} from "react-router-dom"
import{useEffect, useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

export default function Transactions(){
    const navigate =useNavigate()
    const {id} = useParams()
    const[transactions, setTransactions] = useState([])

    const backToDashboard = () => {
        navigate(-1)
    }
 


useEffect(()=>{
    const getTransactions = async () => {
        const res = await api.get(`/transactions/${id}`)
        setTransactions(res.data)
    }
    getTransactions()
},[id])

return(
    <>
        <h2>Transactions</h2>
        {transactions.length === 0 ? <p>No Transactions recorded</p> : <ul>{transactions.map(transaction => (<li key={transaction._id}>{transaction.type.toUpperCase()} ${transaction.amount} on  {new Date(transaction.date).toLocaleString()} </li>))}</ul>}
        <button onClick ={backToDashboard}>Back</button>
</>
)

}