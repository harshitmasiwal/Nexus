let x = 100 // this seted to no. as no because of the type infrence 

// another way of declaring 

let y : number = 110 ;

let money ; //if we declare like this it will take "any" 

money = "harshit"
console.log(money.toUpperCase())

money = 1000 
console.log(money)

//and like this we have one more thing which we call "unknown"

let phone : unknown ;
phone = 398399348394

phone = "jujfejfe"
// console.log(phone.toUpperCase()) //we cant perform this opertion until we make a check of its data typpe by ourself

if (typeof(phone)==='string'){
    console.log(phone.toUpperCase())
}


//non primitive data type

//making of array
let names:string[]  = ["harshit","jiya","rakesh"] //now this will take only string in array

let nums = [1,2,4,5,5,5,2,1] //this will also take only the number 

let mix  = ["harshit",20,"masiwal"] //this will be mixture of both string and no 

let mixture :(string | boolean | number)[] = ["harshit",true,20,"masiwal"] //in this way we can also declare the same mixture

//tuples are those who have a fixed no if elements of specific types

let tp : [string,number,number] = ["harshit",1,500]
//this is how it declared

//using objects in ts

const obj1 = {
    name : "harshit",
    class : 12,
    age : 20,
    gender : "female"
} //this is auto mode 

let obj2:{brand:string,model:number} = {
    brand :"honda",
    model : 20
}

let person : {name : string , balance : number, id : string}

    person = {
        name : "ramesh",
        balance : 202420,
        id : "fi2i2"
    }

//using the type 

type student = {
    name : string,
    age : number , 
    roll : number
}

let s1 :student = {
    name : "harshit",
    age : 20,
    roll : 112
}


//also like this we have interface 

interface bike {
    name : string,
    engine : string , 
    mileage : number
}
interface bike { 
    brake : string
}

let b1 : bike = {
    name : "honda bajaj",
    engine : "125cc",
    mileage : 101,
    brake : "disc"
    
}






