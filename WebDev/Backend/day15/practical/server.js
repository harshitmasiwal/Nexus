const express = require("express");
const { main } = require("./database");
const { book } = require("./models/book");
const app = express();

app.use(express.json());

//CRUD operations using the server

app.get("/", (req, res) => {
  res.status(200).send("server is working");
});

//creating new book in DB

app.post("/book", async (req, res) => {

    try{
    const data = req.body
    await book.create(data)
    res.status(201).send("book created sucessfully")
    }
    catch(err){
        res.status(400).send(err)
    }
    
});

//fetching all the book detail from database

app.get('/book', async (req,res)=>{

    try{
        const allData = await book.find({})
        res.status(200).send(allData)
    }
    catch(err){
        res.status(400).send(err)
    }
    
})

//searching book by name 

app.get('/book/:name',async (req,res)=>{

    try{
        const bookName = req.params.name
        const data = await book.find({name : bookName})
        res.status(200).send(data)
    }
    catch(err){
        res.status(400).send(err)
    }

})

//deleting the book

app.delete('/book/:name',async (req,res)=>{
    try{
        const bookName = req.params.name
        await book.deleteOne({name : bookName})
        res.status(200).send("deletion sucessfull")
    }
    catch(err){
        res.status(400).send(err)
    }
})

    //updating the details of the book

    app.patch('/book/:name',async (req,res)=>{
        try{
            const bookName = req.params.name
            const data = req.body

            const doc = await book.findOne({name : bookName})
            if(data.name){
                doc.name = data.name
            }
            if(data.price){
                doc.price = data.price
            }
            if(data.author){
                doc.author = data.author
            }
            if(data.edition){
                doc.edition = data.edition
            }

            await doc.save()
            res.status(200).send("data updated sucessfully")
            
        }
        catch(err){
            res.status(400).send(err)
        }
    })

main()
  .then(() => {
    console.log("connected to the DB");

    app.listen(4000, () => {
      console.log("server is listening on port 4000");
    });
  })
  .catch((err) => console.log(err));
