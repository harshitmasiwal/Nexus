//arrays

const arr = [1,2,3,4,"harshit",true,"hello"]
console.log(arr)
console.log(arr[2]) 
console.log(arr.at(3)) //supports negative index


console.log(arr.length)

const newarr = arr 

console.log(arr == newarr) //true (same address)
// if we change in arr it will reflect in the newarr
//to tackel this we use structuredclone

const actualcopy = structuredClone(arr); //the structured clone doesnt work when there is an function in array 
console.log(actualcopy == arr)  //false 


// push pop unshift shift 

const listt = [2,true,29,"kamlesh"]

listt.push(19)
listt.push("harshit")

console.log(listt)

listt.pop()

console.log(listt)

//unshift

listt.unshift("first") //insert at first 

console.log(listt)

//shift 

listt.shift()

console.log(listt) //deletes first 

//delete

delete listt[2] //make the place vacent 
console.log(listt)
 
console.log(listt.indexOf("harshit")) //-1
console.log(listt.indexOf("kamlesh")) //3

console.log(listt.includes(true))
console.log(listt.lastIndexOf(2))


console.log(listt.slice(1,3)) //dont make changes in og array

console.log(listt.splice(1,3)) //makes changes in og array
console.log(listt) //remaning 


console.log(listt.toString())
console.log(listt.join("$"))

//flat is used to make 2d or infinte d arraay into one d array


