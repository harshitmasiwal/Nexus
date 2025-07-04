//comparision operator

let a1 = 10 
let a2 = 3

console.log(a1 > a2)

let a = 10 
let b = "10" //type conversion 

console.log(a == b) //true 
console.log(a === b) //false 

console.log(null == undefined) //true 
console.log(null === undefined) //false 



//null can only be equivalent to the undefined
console.log(null == 0 ) 
//when we convert null into number we get 0 
console.log(null < 0 ) //false
console.log(null > 0 ) //false
console.log(null <= 0 ) //true
console.log(null >= 0 ) //true


//for undefined
//undefined can only be equivalent to the null
console.log(undefined == 0 ) //f
//when we convert undefined into number we get NaN
console.log(undefined < 0 ) //false
console.log(undefined > 0 ) //false
console.log(undefined <= 0 ) //false
console.log(undefined >= 0 ) //false

console.log(NaN == NaN) 


