//js is a single threaded synchronus language

//js but also shows asyncronus bheviour means executing the code which take more time and run it parallel to the main code the all functions like settimeout , stinterval these all are asynchronus function and also the window object functions are asynchronus 

// console.log(10)
// console.log(20)
// console.log(30) this will execute one by one 

// console.log(10)
// setTimeout( ()=>{
//     console.log(20)
// },2000)
// console.log(30) //this will give output 10 , 30 , 20
//here the code works asynchronusly

// in another way to execute code synchronusly

const timer = Date.now() //this will give the current time in ms
console.log(10)
while(Date.now() - timer < 2000){
} //this will hold my code for 2 seconds
console.log(20)
console.log(30)

//this will give output 10 , (2sec ka break) , 20 , 30 