//collection of key value pair with unique keys 
//key (any data type ) : value (any data type ) 
//remembers the order of insertion 
//it is diffrent from object because key(is of string type only) : value  (any data type)


const map1 = new Map()
map1.set(3,90) 
map1.set("harshit","masiwal") 
map1.set("jiya","masiwal") 
map1.set(true, "hello") 
map1.set(false,0) 

console.log(map1)

map1.set("harshit","sharma") //if key exits it will be updated 

console.log(map1)

map1.delete(3) //for deleting   
console.log(map1.has("masiwal"))  //this key is not present in map 
console.log(map1.has("harshit"))  //it is key (present )

console.log(map1)



//another way of creating map 

const map2 = new Map( [ ["name","harshit"] , ["age" , 20] , ["gender" , "male"]])
//it takes input in 2d array form 
console.log(map2)

// itreating can be done using for of loop

for(let value of map2) {
    console.log(value)
}

// console.log(map2["name"]) with this we cant acess the value      
// console.log(map2[0]) with this we also cant acess the value 



