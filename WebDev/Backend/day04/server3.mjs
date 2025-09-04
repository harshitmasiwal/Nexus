import http from 'http'

const server = http.createServer((req,res)=>{
    res.end("hello this is form (module js) ")
})

server.listen(3000,()=>{
    console.log("listning on port no 3000")
})

