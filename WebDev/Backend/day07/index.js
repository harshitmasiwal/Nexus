const express = require('express')
const app = express()

app.use(express.json()) //ye parce karta hai json data ko js ke object mai as transfer json format mai data hota hai kyuki wo light weight hota hai as usme js ke object ke meathods nahi hote 

app.get('/user',(req,res)=>{
    res.send("welcome sir")
})

app.post('/user',(req,res)=>{
    console.log(req.body)
    res.send("data send to the server")
})

app.listen(4000,()=>{
    console.log("server is listening on port 4000")
})