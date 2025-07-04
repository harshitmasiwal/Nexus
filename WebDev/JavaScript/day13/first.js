//the reason why we not use var now casue we can redeclare it easily in out code
//also the var is acessible over the whole program even in blocked scopes

// let a = 10
// var b = 20
// const c = 30

// {
//     console.log(a)
//     console.log(b)
//     console.log(c)
// }




// {
//     let a = 10
//     var b = 20
//     const c = 30  
// }

//     console.log(a)
//     console.log(b)
//     console.log(c)      this will threw error 

if(true){
    var sun = 5000
}

console.log(sun)


let arr = [1,3,4,45,5]
for(let i = 0 ; i < arr.length ; i++){
    console.log(arr[i])
}

//travesing an obj 
const person = {
    name : "harsit",
    edu  : "btec"
}

let keys = Object.keys(person)
for(let i = 0 ; i < keys.length ; i++){
    console.log(person[keys[i]])
}
