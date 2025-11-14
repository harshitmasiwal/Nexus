const express = require('express')
const app = express()
require('dotenv').config()
const {connectMongo} = require('../config/db')
const cookieParser = require("cookie-parser")
const authRouter  = require('../routes/userAuth')
const { connectRedis } = require('../config/redis')
const problemRouter = require('../routes/problemOperation')
const submitProblemRoute = require('../routes/submitProblem')
const aiRouter = require('../routes/aiRouter')
const cors = require('cors')
const videoRouter = require('../routes/videoRouter')

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : 'http://localhost:5173',
    credentials: true, // ✅ important
}))
 
app.get('/',(req,res)=>{
    res.send("working")
})

app.use('/user',authRouter)
app.use('/problem',problemRouter)
app.use('/submit',submitProblemRoute)
app.use('/ask',aiRouter)
app.use('/video',videoRouter)

const startServer = async ()=>{

    try{
        await connectMongo()
        console.log("DB connected")

        await connectRedis()
        console.log("redis connected")

        app.listen(process.env.PORT,()=>{
        console.log("Server is running on port "+process.env.PORT)
})
    }
    catch(err){
        console.log("Error : " + err.message)
    }
    
}

startServer()