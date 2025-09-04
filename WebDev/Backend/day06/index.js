const express = require('express')

const app = express()

// ? : make the forward character optional 
// + : u can attach as many u want same character 
// + : u can attach as many any character you want 

// ---->>> /^\/abo(u)?t$/ ye regex expression hai kuch diffrent ssaa

// app.use(/^\/abo(u)?t$/, (req,res)=>{
//     res.send("this is the about page")
// })

// app.use(/^\/abo(u)+t$/, (req,res)=>{
//     res.send("this is the about page")
// })

// app.use(/^\/abo(u)*t$/, (req,res)=>{
//     res.send("this is the about page")
// })


//using of params

app.use('/contact/:id/:name', (req,res)=>{
    console.log({...req.params})
    res.send("this is the contact page")
})

app.use('/apireq', (req,res)=>{
    //if we want to send the api data
    res.send({"name":"harshit","age":20})
})



//isko hamesa niche likhna chiyee kyuki js ek ek karke execute hoti hai 
//if wo isko / upar dekh le to wo uss wale fun ke andar ghuss jayegi usko lagega uske andrr wo nested route pada ho aur hamesa ek hi route khulega / walaa
app.use('/', (req,res)=>{
    res.send("hello world")
})

app.listen(4000,()=>{
    console.log("the server is listening on port 4000")
})