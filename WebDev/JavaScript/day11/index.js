//shallow copy 

const obj1 = { 
    a :1 , 
    b :2 
}

const shallow_copy = obj1
shallow_copy.a = 100
console.log(obj1 , shallow_copy)

//deep copy

const deep_copy = structuredClone(obj1)
deep_copy.a = 101
console.log(obj1 , deep_copy)


//nested objects 

const nes = {
    name : "harshit",
    age : 20,
    address : {
        pincode : 201012,
        city : "vasundhara"
    }
}

console.log(nes)
console.log(nes.address.pincode)

const copy_nes = structuredClone(nes) //this is why we use it 

copy_nes.address.pincode = 20000
console.log(copy_nes , nes)


//destructuring of an object 

const person = {
    name : "harshit",
    age : 20 , 
    address : {
        pincode : 201012,
        city : "vasundhara"
    } , 
    image : "rururgburgu"
}

const {name , age  } = person  //other way 
const {name : user_name , age : user_age} = person //when we want to assign another name to variable

console.log(name,age )
console.log(user_name, user_age )

//if we want to acess specific things from object and make rest as an object

const {name : n , age  : a, ...obj_rest } = person
console.log(n,a,obj_rest)

//the same we can also do for the array , we have to just change the brakcets

const arr = [10,12,43,15,53]
const[first , second , teesra , , fifth ] = arr 
console.log(first,second , teesra , fifth)

//using rest operator we can do same 

const [o,b,...d] = arr
console.log(o,b,d)
 

//destructuring of neested objects

const nested = {
     ame : "harshit",
    age : 20 , 
    address : {
        pincode : 201012,
        city : "vasundhara"
    } , 
    image : "rururgburgu",
    greet : function(){
        return "hello guys"
    }
}

//we want to print the city

const { address : {city : town  , pincode }} = nested
console.log(town , pincode)  
console.log(nested.greet())



