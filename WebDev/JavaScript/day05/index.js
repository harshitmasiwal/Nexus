// memory management 

let a = 10 
let b = a 
// console.log(a)
// console.log(b)

//changing b 
b = "harshit" //this tels that the primitive data type are immutable as it will require more memery to store string so it leaves the first b location and created another b in the stack memeory

console.log(a)
console.log(b)


let obj1 = { 
    name : "harshit",
    id : 101
}

let obj2 = obj1 

console.log(obj1)
console.log(obj2)

///changing obj2 will change the obj1 also as there heap memory loacation is same and if we made changes at one memory it will change 
obj2.id = 99

console.log(obj1)
console.log(obj2)
