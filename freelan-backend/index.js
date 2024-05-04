const express = require("express")
const ConnectDB = require("./config/dbconfig")
const env = require("dotenv").config()
const userRoute  = require("./Routes/userRoute")
const cors =require("cors")

const app = express()

app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/Api/users",userRoute)


ConnectDB()
const port = process.env.PORTS || 5001


app.listen(port,()=>{
    console.log(`App is running on this ${port}`)
})