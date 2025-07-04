//prototype

let obj1 = {
    name : "harshit",
    age : 20
}

let obj2 = {
    balance : 40000000,
    acc_no : "afengejf"
}

console.log(obj2.acc_no)
console.log(obj2.name) // not defined 

obj2.__proto__  = obj1

console.log(obj2.name) // now it is defined 


// Array prototype - > object - > prototype - > null 

console.log(Array.prototype)
console.log(Array.prototype.__proto__)

let arr = [1,2,3,45]

console.log(arr.__proto__ == Array.prototype)
console.log(arr.__proto__.__proto__ == Array.prototype.__proto__)
console.log(arr.__proto__.__proto__ == Object.prototype)
console.log(arr.__proto__.__proto__.__proto__ == null)

