console.log("this is world")


function sum(a,b){
    console.log(a+b)
}

function sub(a,b){
    console.log(a-b)
}

// console.log(module)
console.log(module.exports)  //empty object

// module.exports = sum
// module.exports = {sum , sub }
module.exports.sum = sum 
module.exports.sub = sub 



