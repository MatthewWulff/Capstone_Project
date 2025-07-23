import {useParams} from "react-router-dom"
import{useEffect, useState} from "react"
import api from "../api"

export default function Transactions(){
    const {id} = useParams()
    const[transactions, setTransactions] = useState([])
 


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
</>
)

}