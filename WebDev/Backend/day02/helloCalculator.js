//to use the calculator we can use this long meathod which is not reccmonded importing all the module one by one ex->

// const add = require("./CalcModule/add")
// const sub = require("./CalcModule/sub")
// const mul = require("./CalcModule/mul")

//reccmonded meathod is that use all the require in signle index file then export them all once like this 
const {add,sub,mul} = require("./CalcModule/index")
//const {add,sub,mul} = require("./CalcModule") //this will automatically check for index named file and will work 

add(200,42)
sub(43,2)
mul(3,2)