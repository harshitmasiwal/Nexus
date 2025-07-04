//objects in js

const obj = { 
    name  : "harshit",
    gender : "male",
    0 : "hello",
    "surname" : "masiwal",
    "string hello" : "anything",
    "key" : "value",
    age : 20 ,
    null : 'kamm',
    undefined : "kammchal rha" //sting ki tarh consoder hoti hai key ka name
}

console.log(obj)
console.log(obj["key"])
console.log(obj.name)
console.log(obj[0])
console.log(obj["0"])

//in the same way the array is also implemnted 

const person = new Object()

person.name  = "rohit"
person.age = 30
console.log(person)
//delete 
delete person.age
console.log(person)


//some meathods on objects 

const stu = {
    name : "mohan",
    age: 12 ,
    class : "x"
}

console.log(Object.keys(stu)) //retruns the arraay of all keys in a boject
console.log(Object.entries(stu)) //returns all the values in form of 2d array

//concatination of object

const obj2 = {a:1,b:2,c:3}
const obj3 = {n:0,l:9}
const obj4 = {m:"lll",a:23}

const newobj = Object.assign({},obj2,obj3,obj4)
console.log(newobj)

//other way using spred operator (...)

const easyobj = {...obj2,...obj3,...obj4}
console.log(easyobj)
