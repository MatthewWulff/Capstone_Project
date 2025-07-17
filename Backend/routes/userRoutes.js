import express from "express"
import User from "../models/User"
import Transaction from "../models/Transaction"

const router =express.Router()

router.post('/create' ,async(req, res)=>{
    const{firstName, lastName, pin} = req.body

    const newUser = new User({firstName, lastName , pin})
    await newUser.save()

    
})