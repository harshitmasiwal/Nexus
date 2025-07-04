// hoisting is an concept which says when we write code first it gets assigned the all variables to top 
// then it starts code execution one by one 
//the let and const keyword assign empty value during initlization 
//but the var contains : undefined thats why it doest throws error 

console.log(c) //undefined
console.log(a) //ReferenceError: Cannot access 'a' before initialization
console.log(b)

var c = 5
let a = 10 
const b = 111
