import express from "express"
import User from "../models/User.js"
import Transaction from "../models/Transaction.js"

const router =express.Router()

router.post('/create' ,async(req, res)=>{
    const{firstName, lastName, pin, phone} = req.body

    const newUser = new User({firstName, lastName , pin, phone})
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
router.post('/deposit/:id', async (req,res)=>{
    const {total} = req.body
    const user = await User.findById(req.params.id)
    if(!customer) {
        return res.status(404).send("User does not exist")}

    user.balance += total

    await user.save()

    await Transaction.create({
        type: 'deposit',
        amount: total,
        balance : user.balance
    })
    res.send("Deposit accepted")



})

router.post('/withdraw/:id'), async(req,res)=>{
    const total = req.body
    const user  = await User.find(req.params.id)
    if(!customer) {
        return res.status(404).send("User does not exist")}

    if(customer.balance < total){
        return res.send("Insufficent funds")
    }

    user.balance -= total
    await user.save()

}

export default router