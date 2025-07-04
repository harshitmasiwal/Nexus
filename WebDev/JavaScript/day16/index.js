//reduce in js

// we use the reduce to perform operation and store in the accumalator
//example  

let arr = [1,2,4,5,6]
//int result =  arr.reduce(callback(accumlaor , current) , accumalator ki value )

let result = arr.reduce( (acc , num ) => {
    console.log( acc , num )
    acc = num + acc
    return acc
}, 0)

// in short 
// let result = arr.reduce( (acc,num)=>acc+=num , 0)

console.log(result)


let arr2 = ['orange' , 'mango' , 'apple' , 'banana' ,'mango' , 'mango' , 'orange' , 'banana']
//now i want to count the all varitey of fruits in this array and store them in object like
// {
//     orange : 2,
//     apple : 1 , 
//     mango : 1
// }

//using reduce 

const fruits = arr2.reduce( (acc , fruit_name) => {
    if (acc.hasOwnProperty(fruit_name)){
        acc[fruit_name]++
    }

    else{
        acc[fruit_name] = 1 
    }
    return acc   //ye important hai return karwana 
} ,{})

console.log(fruits)

// const obj = {
//     name : "harshit"
// }

// console.log(obj.hasOwnProperty(obj.name))



