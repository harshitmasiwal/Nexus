const express = require("express");
const app = express();
const { main } = require("./database");
const { Citizens } = require("./models/citizen");
const {validateUser} = require("./utils/validateUser")
const bcrypt = require('bcrypt')

app.use(express.json({
    strict : true
}))


app.get("/", (req, res) => {
  res.send("working");
});

app.post('/register',async (req,res)=>{

    try{
        validateUser(req.body) //validates the users input at the api level

        //now hash the user password for storing in the db
        req.body.password = await bcrypt.hash(req.body.password,10)
        
        await Citizens.create(req.body)
        res.send("User created Sucessfully")
    }
    catch(err){
        res.send("Error : "+err.message)
    }

})

app.get('/login',async (req,res)=>{

    try{

        const user = await Citizens.findById(req.body._id)
        
        if(!(req.body.email === user.email)){
            throw new Error("Invalid credinatials")
        }

        const isAllowed = await bcrypt.compare(req.body.password,user.password)
        if(!isAllowed){
            throw new Error("Invalid credinatials")
        }
        res.send("login sucessfull as : "+user.firstname)

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
