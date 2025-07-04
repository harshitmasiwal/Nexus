//sets in js store only unique value 
//set can defined using new keyword and accepts an array in his parameters

const set1 = new Set([12,434,21,12,42,34,2,2,12,42,"harshit","jiya","harshit"])
console.log(set1)

const set2 = new Set()
set2.add(10)
set2.add(10)
set2.add(20)
set2.add(10)
set2.add(40)
set2.add(20)
// Set(3) { 10, 20, 40 }
set2.delete(20)
// Set(2) { 10, 40 }
console.log(set2)

//example of set usage 

let user_id = new Set(["harshit.masiwal" , "jiya.masiwal" , "kamlesh_masiwal" , "kailash chandra"])
//if anyone one wants to add his id he can try his name 
let new_user = "harshit.masiwal"
user_id.has(new_user) ? console.log(`user exists ${new_user}`) : user_id.add(new_user)
new_user = "hm2005"
user_id.has(new_user)  ?  console.log(`user exists  ${new_user}`) : user_id.add(new_user)

console.log(user_id)
user_id.clear() //removes the all ids 
console.log(user_id)

//converting an array into set 

let arr = [1,1,13,0,2,14,134]
// let newset = new Set(arr) 
let newset = new Set([...arr]) 
console.log(newset)

//covertung an set to array 

const convertedset = [...newset]
console.log(convertedset)

//union operation over two sets 

let a = new Set([10,32,42,13,10])
let b = new Set([20,1,2,13,10])

let u = new Set([...a , ...b ])
console.log(u)

//intersection 

let c = new Set([10,32,42,13,10])
let d = new Set([20,1,2,13,10])

let i = new Set( [...c].filter( value => d.has(value)) )
console.log(i)

//iterate over a set
 
for(let value of c ){
    console.log(value)
}
