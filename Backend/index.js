import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/userRoutes.js"

dotenv.config()

const app = express()
app.use(express.json())

app.use("/bank/user", router)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.Mongo_URL)
.then(()=> console.log('Mongo connected'))
.catch(err=> console.log(err))


app.get("/", (req,res) => {
    res.send("Hello from server!")
})
app.listen(PORT , ()=>{
    console.log(`Listening on port : ${PORT}`)
})