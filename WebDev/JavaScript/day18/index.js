// aaj dekhenge golbalThis and normal wala this 

//window ke baare mai jisme saare function rhete hai like console and other functions joki directly accesable hote hai apne browser ke console mai aur yahi chizz jab ham node.js ke engine mai run karte hai to nahi hota because uske like window keyword valid nahi hai aur wo use karta hai global keyword ko 

// ex 
console.log(global) //iske pass hi saari propery rheti hai in node js
// console.log(window) //iske pass bhi saari proprty rheti hai in browser 
//and ase hi diffrent name ho sakte hai alag alg envoirment ke liye 

//to iss problem ko takel karne ke liye hi use mai laya gya globalThis keyword ko

console.log(globalThis) //ye sab enviornmet pe work krega 

//hamare liye optional hai globalThis ko likhna it is same 

console.log(globalThis.Math.random())


// "use strict"

// a = 10 
// console.log(a)

// aur normal wla this keyword use hota hai just for picking up the context 
//ex 

const obj = {
    name : "harsh",
    age : 20 ,
    greet : function(){
        console.log("hello greet")
        console.log(this) //{ name: 'harsh', age: 20, greet: [Function: greet] }
    }
}

console.log(obj.greet())

