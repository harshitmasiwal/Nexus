//advance loops in js 
// for in loop

//beacuse for in can itreate over the object 

const obj = {
    name : "harshit",
    age : 20 ,
    gender : "male",
    city : "ghaziabad"
}


for( key in obj ){
    console.log(key , obj[key])
}

let obj2 = Object.create(obj) //chainging the prototype of obj2 so it can acess obj elements
obj2.balance = 20000
obj2.bank = "kotak"
console.log(obj2["name"]) //harshit

//viewing the keys of the obj2
console.log(Object.keys(obj2)) //[ 'balance', 'bank' ] it will not show the protoype values in keys

for(i in obj2) {
    console.log( i ,obj2[i])
}  //this will print all the values of the object 
// balance 20000
// bank kotak
// name harshit
// age 20
// gender male
// city ghaziabad






