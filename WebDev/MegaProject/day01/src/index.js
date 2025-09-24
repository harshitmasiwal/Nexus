const express = require('express')
const app = express()
require('dotenv').config()
const {connectMongo} = require('../config/db')
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())
 
app.get('/',(req,res)=>{
    res.send("working")
})




const startServer = async ()=>{

    try{
        await connectMongo()
        console.log("DB connected")

        app.listen(process.env.PORT,()=>{
        console.log("Server is running on port "+process.env.PORT)
})
    }
    catch(err){
        console.log("Error : " + err.message)
    }
    
}

startServer()