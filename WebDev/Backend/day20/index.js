const express = require("express");
const app = express();
const { main } = require("./database");
const { Citizens } = require("./models/citizen");
const {validateUser} = require("./utils/validateUser")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const cookieParser = require('cookie-parser');
const { userAuth } = require("./middlewares/userAuth");
 
app.use(express.json({
    strict : true
}))

app.use(cookieParser()) 


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

app.post('/login',async (req,res)=>{

    try{

        // const user = await Citizens.findById(req.body._id)
        
        // if(!(req.body.email === user.email)){
        //     throw new Error("Invalid credinatials")
        // }

        const user = await Citizens.findOne({email:req.body.email})

        if(!user){
            throw new Error("Invalid credinatials")
        }

        const isAllowed = await bcrypt.compare(req.body.password,user.password)
        if(!isAllowed){
            throw new Error("Invalid credinatials")
        }

        //also genrate a token for the user 

        // res.cookie("cookieName","the data we want to store in cookie")
        // cookieName=the%20data%20we%20want%20to%20store%20in%20cookie; Path=/; 

        // for genrating the token using the jwt 
        const token = jwt.sign({email : user.email , firstname : user.firstname} , "secret_key")        

        //important

        //we can also genrate a token which get expires in specific time using the code 
        // const token = jwt.sign({email : user.email , firstname : user.firstname} , "secret_key" , {expiresIn : 10})     
        //this will make the token expire in 10seconds read the jwt docs for more info


        //now send the genrated token as cookie 
        res.cookie("genratedToken",token)
        // genratedToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaGFuQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6IklTSEFOIEdST1ZFUiIsImlhdCI6MTc1NzM1NTM0M30.am7wh43FVqb7AHnfQTOtJDcCnND2RXTinOiY7eqVPCA; Path=/;

        // now we have the stored token in our browser with the help of it we can retrive the payload info easily -> check /user route for more

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



app.get('/user',userAuth ,async (req,res)=>{

    try{

        //retrive the users json token payload 
        // console.log(req.cookies) this will give us the token like this 
        //{genratedToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.      eyJlbWFpbCI6ImlzaGFuQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6IklTSEFOIEdST1ZFUiIsImlhdCI6MTc1NzM1NTcxMH0.nz3_CoVoEIcUNaIfukcyJfE2Au7HOUS3qsd7CVEGNqg'}

        //to extract the payload info we can use 
        // const payload = jwt.verify(req.cookies.genratedToken,"secret_key") 
        // console.log(payload)
        //the payload jwt.verify retuns the payload of the specific token (req.cookies.genratedToken)
        //   {
        //   email: 'ishan@gmail.com',
        //   firstname: 'ISHAN GROVER',
        //   iat: 1757356013
        // }
         
        //now we can acess the payload.email anywhere in this route
        //iat tells the creation time of the jwt token यह एक timestamp है → 1757356013 seconds after 1 Jan 1970

        const user = req.result
        res.send(user)
    }
    catch(err){
        res.send("Error : "+err.message)
    }

})


app.delete('/user',userAuth,async (req,res)=>{

    try{

        const user = req.result
        await Citizens.findOneAndDelete({email:user.email})
        res.cookie("genratedToken","")
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
