import { useState } from "react";
import api from "../api";


const[isUser, setisUser] = useState(false)
const[form, setForm] = useState({firstName:'', lastName: '', pin: ''})

const formChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value})
}

const userSubmit = async (e) => {
    e.preventDefault()
}