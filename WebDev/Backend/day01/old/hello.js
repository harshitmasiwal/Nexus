const {sum , sub }= require("./world")


// the above require returns the code of the world.js file as an IIFE 
// (Immediately invoked function expression) 
// like this
// (function(){
//     console.log("hello")
// }   
// )() like this 

//if i want to use the sum function here then i will have to write code like this 

console.log("this is hello")
sum(10,23)
sub(100,23)

