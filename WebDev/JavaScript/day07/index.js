//sochooo behthh ke

let num1 = 123
let num2 = new Number(123)
let num3 = new Number(123)

console.log(num1 == num2)
console.log(num2 == num3)

let num = 273.93493

console.log(num.toFixed(4)) //273.9349

console.log(num.toExponential(3)) //2.739

console.log(num.toPrecision(2)) //tells in e

console.log(num.toString())

console.log(num.valueOf())


//Maths modeule

console.log(Math.E)
console.log(Math.random()) // 0 < 1 

//floor and ceil 

let numx = 24.8

console.log(Math.floor(numx)) //24
console.log(Math.ceil(numx)) //25


// genrating random no

console.log(Math.floor(Math.random() * 10) ) // 0 < 9

//genrating from 11-20

console.log(Math.floor(Math.random()  * 10) + 11) //11 < 20
 

//fourmula for genrating random no b/w a specific range

//console.log(Math.floor( Math.random() * (Max - min + 1 ) + min))

console.log(Math.floor( Math.random() * (40 - 30 + 1 ) + 30))

//genrating for ludo dice 
console.log(Math.floor( Math.random() * (6 - 1 + 1 ) + 1))



