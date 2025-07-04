const obj1 = {
    name : "harshit",
    roll : 10
}

// console.log(obj1)

obj1.roll = 12  //const can also be updated if it is non primitive

// console.log(obj1)

// but if we try to assign any other value at direct location we cant 

// let a = 10 
// obj1 = a //error


///strings in js

let price = 70 
let str = `the price of car is ${price} outside india`  //best way for string
console.log(str)


// "hello coder "

console.log(' "hello coder" ')

// 'hello coder'

console.log(" 'hello coder' ")

//printing \n or any word by adding \ in front of it

console.log("this is the way we can print \\n in js")

//touppercase 
console.log(str.toUpperCase())
//tolowercase
console.log(str.toLowerCase())

//extracting substring 

let newstr = "hello harshit"
console.log(newstr.slice(0,1)) //h 
console.log(newstr.slice(-7,-1)) //harshi
//slice can also take negative indexes 

console.log(newstr.substring(0,3)) //hel

//replacing content

let new2str = newstr.replace("harshit","krishna") //also we have replaceall function 
console.log(new2str)

let str2 = "honey , money , sunny , funny"
console.log(str2.split(","))

//trim 

let str3 = "           bghrhgrurughr"
console.log(str3)
//removes extra white spaces from start and end
console.log(str3.trim())


//creating string in the heap using new 

let strupdated = new String("hbfrghurhrghruhgurhgr")
console.log(strupdated)
console.log(typeof strupdated) //this will be of object type

