//for in loop ko arrray ke sath use nahi karte 

const arr = [1,2,3,4,5,66,6,]
for(key in arr ){
    console.log(arr[key])
}

// now suppose someone make any key named anything

arr.name = "harshit"
arr.age = 20

for(key in arr ){
    console.log(arr[key])
} //this can cause error casue it willl print all the keys

// for good we use normal one 

for(let i = 0 ;  i < arr.length ; i++){
    console.log(arr[i])
}  //this will ignore the keys which are 