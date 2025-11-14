in this i learned about the usage of websockets by making the basic html,js app


the path library is used to serve the index.html file to the client whenever user hits the link 
what path does is that it retrive the directory path of the server and connect the page which to forward to client like in this case we want to forward the index.html file 
so it solves our problem to start the frontend

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})