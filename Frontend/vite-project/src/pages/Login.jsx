import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import api from "../api";

export default function Login(){
const[notUser, setisUser] = useState(false)
const[form, setForm] = useState({firstName:'', lastName: '', pin: ''})

const formChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value})
}

const userSubmit = async (e) => {
    e.preventDefault()

    if(notUser){
        const res = await api.post('/user/create', form)
    }
    else{
        const res = await api.post('/users/login' , form)
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
       </form>
    </>

)

}