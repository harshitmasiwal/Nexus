//java script mai sort function dhange se kamm nahi kartaaaaaaaaaaaaaa

let arr = [100,10,20,50,35,42,24,13]
// arr.sort()
//console.log(arr)
// [ 10, 100, 20, 35, 50 ]
//isne kyuki sorting kari phele inko string mai covert kiya then as string treat karte hue dekha ki kon 
//ascii value mai phele aata hai 


// now lets see  another way of finding the random unique index of an array 

// arr.sort( (a,b)=>{
//     a-b  //if +ve then it swaps 
// } )

arr.sort( ()=>{
   return (0.5 - Math.random())
} )

//console.log(arr) //now this will randomly sort the array and i can take the required part by slicing the array 

//another dsa oriented approach is mindblowing for the same 

let arr2 = [100,10,20,50,35,42,24,13]

// suppose i need 5 random Element form this array 
let ans = []
let length = arr2.length
while( ans.length != 5){

   const idx = Math.floor(Math.random() * length)
   
   let temp = arr2[idx]
   arr2[idx] = arr2[length-1]
   arr2[length-1] = temp
   //swaping
   ans.push(arr2[length-1])

   length--
}

console.log(ans) //now i will get only unique indexes and elements using math.random