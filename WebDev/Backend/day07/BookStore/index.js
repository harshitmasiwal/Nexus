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

app.get('/books/:id',(req,res)=>{
    const id = Number(req.params.id)   
    res.send(AllBooks.find(bookID=> bookID.id === id ))
})

app.post('/books',(req,res)=>{

    AllBooks.push(req.body)
    res.send("data saved sucessfully")
})

app.delete('/books/:id',(req,res)=>{ 
    const id = Number(req.params.id)
    let deletedBook = delete AllBooks[id-1]
    res.send("deleted the book sucessfully")
})

app.listen(5000,()=>{
    console.log("The server is listening on port 5000")
})



//app.use aur app.get , post , put , patch , delete 
// inme kya diffence hai 
//use wala thoda sa route match hone mai ghuss jata hai jabki baki exact route match hone pe hi chalte hai aur use wlaa sare meathods handel kar leta hai bina kuch bataye 