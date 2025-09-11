const express = require('express')
const app = express()

const {main} = require('./database/database')
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

app.listen("3000",async ()=>{
    await main()
    console.log("server is running on port 3000")
})