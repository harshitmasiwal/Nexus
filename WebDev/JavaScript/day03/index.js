//non primitive datatypes

//array

let arr = ["harshit" , 20 ,60 ,8202249249493n, "lists"]
console.log(typeof arr)  // it is also object
console.log(arr)

//object  (key : value pair)

let obj = {
    username : "harshit",
    age : 20 ,
    gender : true
}
console.log(typeof obj)  // it is also object
console.log(obj)

//function 

let funname = function(){
    console.log("this is function")
}

funname();
console.log(typeof funname) // it will be of function type 


//type conversiion 


//num to string 

let num = 100001
let bal = String(num)
console.log(typeof num , num)
console.log(typeof bal , bal)


//string to num  

// let str = "100001"
// let num2 = Number(str)
// console.log(typeof str , str)
// console.log(typeof num2 , num2)

//if i typed charater 
let str = "100001ss"
let num2 = Number(str)
console.log(typeof str , str)
console.log(typeof num2 , num2) //NaN - NOT A NUMBER 

//boolean to string

let day = true
let str2 = String(day)
console.log(typeof day , day)
console.log(typeof str2 , str2)


