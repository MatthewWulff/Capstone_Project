import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import api from "../api";



export default function Login(){
const[isUser, setIsUser] = useState(false)
const[form, setForm] = useState({firstName:'', lastName: '', pin: ''})
const[message, setMessage] = useState('')

const navigate = useNavigate()

const formChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value})
}

const userSubmit = async (e) => {
    e.preventDefault()
  try{
    if(isUser){
        const res = await api.post('/user/create', form)
        setMessage(res.data.message)

    }
    else{
        const res = await api.post('/users/login' , form)
        navigate(`/dashboard/${res.data.userID}`)
    }
}catch(err){
    setMessage(err.response?.data?.message)
}
}




return(
    <>
       <h2>{isUser ? 'Create Account' : "Login" }</h2>
       <form onSubmit= {userSubmit}>
            <input name = "firstName"
            placeholoder = "First Name"
            value={form.firstName}
            onChange={formChange}/>
        
            <div></div>

            <input name = "lastName"
            placeholder="Last Name"
            value= {form.lastName}
            onChange= {formChange}/>
            <div></div>

            <input name = "pin"
            placeholder="PIN"
            value= {form.pin}
            onChange={formChange}/>
            <div></div>

            <button type ="submit"> {isUser ? 'Create Account' : 'Login'}</button>
        </form>
        <p>{message}</p>
        <button onClick={() => setIsUser(!isUser)}>{isUser ? 'Account already exists. Login' : 'Create Account'}</button>
    </>

)

}
