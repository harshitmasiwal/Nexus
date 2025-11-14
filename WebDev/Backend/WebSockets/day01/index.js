//establishing an server with the socket.io functionality but not reccmonded way

// const express = require("express")
// const app = express()
// const {Server} = require("socket.io")

// app.get("/",(req,res)=>{
//     res.send("hello there ")
// })

// const server = app.listen("3000",()=>{
//     console.log('server is running on port 3000')
// })

// const io = new Server(server)



//establishing in a correct way 

const express = require("express")
const app = express()
const {Server} = require("socket.io")
const http = require("http")

const mainServer = http.createServer(app)
const io = new Server(mainServer)

io.on("connection",(socket)=>{

    //socket contains the client unique id and the data (it is like the request , response) which we previously used 
    socket.on("disconnect" , ()=>{
        console.log("disconnected from main server")
    })
})

mainServer.listen("3000",()=>{
    console.log("server is running on port 3000")
})








