import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
dotenv.config()


express.json()

const app = express()
const PORT = process.env.PORT || 7000

app.use("/auth", proxy(process.env.AUTH_SERVICE));

app.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT}`)
})