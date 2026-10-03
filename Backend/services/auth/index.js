import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()


express.json()

const app = express()
const PORT = process.env.PORT || 7000

app.get("/", async (req,res) => {
    res.status(200).json({message:"hello from auth"})
})


app.listen(PORT,()=>{
    connectDB()
    console.log(`The server is running on port ${PORT}`)
})