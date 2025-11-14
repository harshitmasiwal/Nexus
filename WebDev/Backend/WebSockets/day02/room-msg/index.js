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

    socket.on("new_msg",({room,msg})=>{
        // io.to(room).emit(msg) isse room mai sabke pass jayega even khud ke pass bhi
        console.log(msg)
        socket.to(room).emit("new_msg",{msg})
        console.log(msg)
    })

    socket.on('join-room',(roomId)=>{
        socket.join(roomId)
    })

    socket.on("disconnect",()=>{
        console.log("disconnected from server")
    })

})


server.listen(3000,()=>{
    console.log("server is running on port 3000")
})

