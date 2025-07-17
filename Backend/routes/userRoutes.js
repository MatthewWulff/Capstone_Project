import express from "express"
import User from "../models/User"
import Transaction from "../models/Transaction"

const router =express.Router()

router.post('/create' ,async(req, res)=>{
    const{firstName, lastName, pin} = req.body

    const newUser = new User({firstName, lastName , pin})
    await newUser.save()

    res.json("User Created")

    
})
router.get('balance/:id' , async (req,res)=> {
    const user = await User.findById(req.params.id)

    if(!customer) {
        return res.status(404).send("User does not exist")
    }else{
        res.json({balance: user.balance})
    }
})