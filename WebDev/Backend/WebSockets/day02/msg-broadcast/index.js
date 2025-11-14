const express = require("express")
const app = express()
const http = require("http")
const {Server} = require("socket.io")
const path = require("path")

const server = http.createServer(app)
const io = new Server(server)


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})


io.on("connection",(socket)=>{

    socket.on('msg',(data)=>{
        // io.emit('new_msg',data) //forward to all the users even self 
        socket.broadcast.emit('new_msg',data) //isse sabko jayega siwaye self ke
    })

    socket.on("disconnect",()=>{
        console.log("disconnected from server")
    })

})


server.listen(3000,()=>{
    console.log("server is running on port 3000")
})

