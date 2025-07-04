//for of loop is used to directly itreate over the values of array , string

let arr = [1,3,4,5,5,6,6]
for(value of arr ){
    console.log(value)
}

let str = "harshit"
for(char of str){
    console.log(char)
}

//but we cant use it for object 
const obj = {
    name : "harshit",
    age : 20
}
// for(value of obj){
//     console.log(value)
// } // this will throw error 


//call back function are those function whichh are passed to another function as parameter

function name(){
    console.log("this is name")
}

function greet(fun){
    fun()      //this is name
    console.log("this is greet") //this is greet
}

greet(name); //here name is callback function which is passed as arugment

//example where callback functions are used 

function fetchData(){
    console.log("feteching data ...")
}

// setInterval(fetchData,4000) //here we passes the fetchData as callback 


//forEach function  -- just for itreating over an array 

let arr2 = [1,2,3,4,5,6,7,7,8]
// arr2.forEach(//function( value , index , whole array))

arr2.forEach( function(value , index , arr2){
    console.log(value , index)
} )

//in short we can use arrow function 
arr2.forEach( num => console.log(num*num) )
arr2.forEach( (num,index ) => {
    arr2[index] = num*2   //we can perform anything but we cant get result 
})

console.log(arr2)


//filter  -- ye return karta hai result jisko store karwana padta hai kisi variable mai

let arr3 = [43,55,3,313,53,13,546]
let result =  arr3.filter( (num , index , arr3) => {
    return num > 40 //whenever this gets true that value will be stored in result
})
console.log(result)

let marksheet = [
    {name : "mohan" , marks : 90},
    {name : "rohan" , marks : 20},
    {name : "sachan" , marks : 41},
    {name : "mavin" , marks : 30},
]

//filtering the students whose marks are more than 35

// const passed = marksheet.filter( obj => {
//     return obj.marks > 35 
// })

const passed = marksheet.filter( ({marks}) => {   //yha pe destrucuture kar diya phle hi 
    return marks > 35  
})

console.log(passed) 


// map -- ye bhi return karta hai result and kuch bhi kamm karwa lo iske andar like foreach bass return karega ye kuch na kuch 

const arr4 = [43,23,2,13,53,34]
const ans =  arr4.map( (value,index) => {
    return value * index
})

console.log(arr4) //orignal array 
console.log(ans) //resultent array 
 

//chaining all these for any operation like we want to filter the even elements from array and multiply them with 10 

const arr5 = [10,23,12,43,23,23,42,66,42]

const ans2 = arr5.filter(num=> num%2 == 0 ).map( num => num*10)
console.log(ans2)
