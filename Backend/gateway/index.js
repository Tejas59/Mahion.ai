import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
import cors from "cors"
import cookieParser from "cookie-parser";
dotenv.config()


express.json()

const app = express()

app.use(express.json());
const PORT = process.env.PORT || 7000
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/api/auth", proxy(process.env.AUTH_SERVICE));


app.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT}`)
})