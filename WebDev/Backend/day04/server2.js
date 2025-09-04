//making of server using the node js (it requires the http module of the nodejs)

const http = require('http')
//console.log(http) //can see the whole object 

//if we want to do routing in our server we can simply dooo 

const server = http.createServer((req,res)=>{
    if(req.url == "/"){
      res.end("Hello i am your local server")
    }
    else if(req.url == "/about"){
    res.end("Hello i am your about page")

    }
    else if(req.url == "/contact"){
    res.end("Hello i am your contact page")
    }
    else{
        res.end("page not found")
    }
})

server.listen(8000,()=>{
    console.log("server is listening on port 8000")
})