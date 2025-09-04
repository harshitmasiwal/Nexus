const express = require('express')
const app = express()

// app.get('/home',[(req,res,next)=>{
//     console.log('this is first')
//     next();
//     console.log('this is sixth')
// },
// (req,res,next)=>{
//     console.log('this is second')
//     next();
//     console.log('this is fifth')
// },
// (req,res)=>{
//     console.log('this is third')
//     res.send('this is third')
//     console.log('this is fourth')

// }])

//agr mai inko array ke andar pack kar du to bhi sahi chelga ye sab like above 


//mainting logs 

app.use('/home',(req,res,next)=>{
    console.log(`${new Date().toISOString()} at url ${req.url} with method ${req.method}`)
    next()
})

app.get('/home',(req,res)=>{
    res.send("Info about user ")
})

app.put('/home',(req,res)=>{
    res.send("Info posted for user ")
})

app.post('/home',(req,res)=>{
    res.send("Info about user posted ")
})


app.delete('/home',(req,res)=>{
    res.send("Info about user deleted ")
})




app.listen(4000,()=>{
    console.log('server is listening on port 4000')
})