const fs = require("fs")
//console.log(fs) //it is one the default module which comes with the nodejs 

//the functionality of the using the system like the settimeout , readfile or any system using commands are provided by the LIBUV 

// Libuv is written in c program as c langauge can communicate with the system 
//when we call the any system function in node js then it uses the libuv implemeataion which is platform independent and has code in c language to do work using system resources 

const data = fs.readFileSync("data.json" , "utf-8") //blocking code as it is synchronus
console.log(data)

console.log("hello i am handeled by the js")