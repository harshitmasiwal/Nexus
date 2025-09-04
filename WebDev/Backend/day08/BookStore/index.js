const express = require('express')
const app = express()

app.use(express.json())

let AllBooks = [
    {id : 1 , name : "It ends with US" , author : "Collen Hoover"},
    {id : 2 , name : "Harry Potter" , author : "JK Rowllings"},
    {id : 3 , name : "You are a BadAss" , author : "Jen Sincero"},
    {id : 4 , name : "The Hate u Give" , author : "Angie Thomas"}
]

app.get('/books',(req,res)=>{
    res.send(AllBooks)
})

app.post('/books',(req,res)=>{
    AllBooks.push(req.body)
    res.send("Data saved Sucessfully")
})

app.patch('/books',(req,res)=>{
    if(!req.body){
        res.send("error patch")
        return
    }
    const item = req.body
    console.log(item)
    const idx = AllBooks.findIndex(info=> info.id === item.id)
    if(item.name){
        AllBooks[idx].name = item.name
    }
    if(item.author){
        AllBooks[idx].author = item.author
    }

    res.send("data patched sucessfully")
})

app.put('/books',(req,res)=>{
    
    if(!req.body){
        res.send("error put")
        return ;
    }
    const item = req.body
    const idx = AllBooks.findIndex(info=>info.id === item.id)
    AllBooks[idx] = req.body
    res.send("data putted sucessfully")
})

app.delete('/books/:id',(req,res)=>{
    if(!req.params.id){
        res.send("error delete")
        return
    }
    const id = Number(req.params.id)
    const elementIDX = AllBooks.findIndex(item=>item.id === id)
    AllBooks.splice(elementIDX,1);
    res.send("data deleted sucessfully")
})


app.listen(4000,()=>{
    console.log("server is listening on port 4000")
})