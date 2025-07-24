import express from "express";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

const router = express.Router();


router.delete("/delete/:id" , async (req,res)=> {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    await Transaction.deleteMany({userId:req.params.id})
    res.json({message: "User deleted"})
})

router.get("/transactions/:id", async(req,res)=>{
    const transactions = await Transaction.find({userId:req.params.id})
    res.json(transactions)
})

router.post('/login',async (req,res)=>{
    const {firstName,lastName,pin}= req.body
    const user = await User.findOne({firstName, lastName,pin})
  
    if(!user){
        return res.status(400).json({message: "Invalid"})
    }
      res.json({userId: user._id, balance:user.balance})
    
})

router.post("/create", async (req, res) => {
  const { firstName, lastName, pin, } = req.body;

  const newUser = new User({ firstName, lastName, pin,});
  await newUser.save();

  res.json({message: 'Account created', userId: newUser._id});
});

router.get("/balance/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).send("User does not exist");
  } else {
    res.json({ balance: user.balance });
  }
});

router.post("/deposit/:id", async (req, res) => {
  const amount = Number(req.body.amount);
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send("User does not exist");
  }

  user.balance += amount;

  await user.save();

  await Transaction.create({
    userId: user._id,
    type: "deposit",
    amount,
    balance: user.balance,
  });
  res.json({balance:user.balance});
});

router.post("/withdraw/:id", async (req, res) => {
  const amount = Number(req.body.amount);
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send("User does not exist");
  }

  if (user.balance < amount) {
    return res.status(400).json({ message: "Insufficient funds" });
  }

  user.balance -= amount;
  await user.save();

  await Transaction.create({
    userId: user._id,
    type: "withdraw",
    amount,
    balance: user.balance,
  });
  res.json({balance:user.balance});
});

export default router;
