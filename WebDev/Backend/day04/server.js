//making of server using the node js (it requires the http module of the nodejs)

const http = require('http')
//console.log(http) //can see the whole object 

const server = http.createServer((req,res)=>{
    res.end("Hello i am your local server")
})

server.listen(8000,()=>{
    console.log("server is listening on port 8000")
})