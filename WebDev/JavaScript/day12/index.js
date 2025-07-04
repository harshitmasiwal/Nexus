//functions 

// function greet() {
//     console.log("hello kese hoo ") 
//     return "aap kese hoo"
// }

// greet() 
// console.log(greet())

//add 

function sum(num1 , num2){
    console.log(num1 + num2)
}

sum(2,5)

const fun = function(){
    console.log("yaha fun ho rha hai")
}

fun()

//arrow function 

const funcho = () => {
    console.log("youtuber")
}

funcho()

//one lined arrow function which returns by default

const mul = (number1,number2) => number1 * number2          //ek line mai function bann gya
console.log(mul(9,8))

//jab ek hi parameter hoo to bina braket ke bhi kamm chal jata

const cube = no => no*no*no
console.log(cube(9))


//using rest operator in function parameters for taking infinitley many values

const add = (...nums) =>{
    console.log(nums)  //the received array of all inputs now we can use for loop and calc their sum 
}

add(2,1,45,13,15,24,53)  


//passing obj in function 

const obj = {
    name : "harshit" , 
    age : 20 , 
    address : {
        pincode : 201012, 
        city : "ghaziabad"
    }
}
//now suppose i want to get the details of obj name and city 
//i have two way either to pass the whole obj in the function or pass only required values

const objprint = ( {name : user_name , address : {city : user_city}} ) => {
    console.log(user_name , user_city)
}

objprint(obj)

//lets check wether the obj passed in function is pass by value or pass by refrence

function rename (obj1){
    obj1.name = "mukesh"
}

console.log(obj)
rename(obj)
console.log(obj) //we can see the name is changed so it is pass by refrence 
