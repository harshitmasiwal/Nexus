const express = require('express')
const app = express()

const {connectMongoDB} = require('./database/mongodb')
const {connectRedis} = require('./database/redis')

const { authRouter } = require('./routes/auth')
const { dataRouter } = require('./routes/data')
const {Student} = require('./models/student')


const cookieParser = require('cookie-parser')
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())

//ping testing 
app.get('/',(req,res)=>{
    res.send("working")
})

//admin acess
app.get('/all', async (req,res)=>{
    const allData = await Student.find({})
    res.send(allData)
})

//routes
app.use('/',authRouter)
app.use('/data',dataRouter)


//start server 
const startServer = async ()=>{
    try{
        // await connectMongoDB()
        // console.log("connected to MongoDB")

        // await connectRedis()
        // console.log("connected to RedisDB")

        //if we want to connect them parallely then we should use 
        await Promise.all([connectMongoDB(),connectRedis()])
        console.log("connected to DB")

        app.listen("3000",()=>{
            console.log("server is listening on PORT 3000")
        })
    }
    catch(err){
        console.log("error : "+err.message)
    }
}

//calling start server 
startServer()