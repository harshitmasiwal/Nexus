//using the date 

const d = new Date()
console.log(d)  //current date fetched using system clock 

console.log(d.toDateString())
console.log(d.getDate())
console.log(d.getTime()) //from 1970 jan 01 
console.log(d.getMonth()) //month start from 0 index

//making an birthday counter

const today = new Date()
// const birthday = new Date(2005,9,6,12,0,0,0)   
const birthday = new Date("2005-10-06") //another way to declare date
console.log(birthday.toDateString())
console.log(birthday)



const age = today - birthday ; 
console.log(age) //gives answer in milisec 

 
let days = Math.floor( age/(1000*24*60*60) )
let hours = Math.floor(age/(1000*60*60)%24)
let min = Math.floor(age/(1000*60)%60)
let sec = Math.floor(age/(1000)%60)

console.log(`You have elasped ${days} days , ${hours} hours , ${min} and ${sec} seconds `)