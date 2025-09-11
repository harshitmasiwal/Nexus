const express = require("express");
const app = express();
const { main } = require("./database");
const { Citizens } = require("./models/citizen");

app.use(express.json())

app.get("/", (req, res) => {
  res.send("working");
});

app.post('/register',async (req,res)=>{

    try{
        await Citizens.create(req.body)
        res.send("User created Sucessfully")
    }
    catch(err){
        res.send("Error : "+err.message)
    }

})

app.get('/users',async (req,res)=>{

    try{
        const users = await Citizens.find({})
        res.send(users)
    }
    catch(err){
        res.send("Error : "+err.message)
    }

})



app.get('/users/:id',async (req,res)=>{

    try{
        const id = req.params.id
        const user = await Citizens.findById(id)
        res.send(user)
    }
    catch(err){
        res.send("Error : "+err.message)
    }

})


app.delete('/users/:id',async (req,res)=>{

    try{
        const id = req.params.id
        const user = await Citizens.findByIdAndDelete(id)
        res.send("deleted user sucessfully")
    }
    catch(err){
        res.send("Error : "+err.message)
    }

})

app.patch('/update',async (req,res)=>{

    try{
        const {_id , ...details } = req.body
        await Citizens.findByIdAndUpdate(_id , details , { runValidators : true} )
        res.send("data updated sucessfully")
    }
    catch(err){
        res.send("Error : "+err.message)
    }

})

main().then(async () => {
  console.log("connected to DB");

  app.listen(4000, () => {
    console.log("server is listining on port 4000");
  });


}).catch((err)=>{
    console.log("Error : "+err.message )
})
