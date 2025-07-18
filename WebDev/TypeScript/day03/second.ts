// array of objects 

const arr : {name:string,age:number}[] = [{name:"jiya",age:20} , {name:"sonu",age:30}] 
// other way of wrting the same 

interface temp {name:string,age:number}
const newarr : temp[] = [{name:"jiya",age:20} , {name:"sonu",age:30}] 


//functions in ts

function greet(name:string) : void{
    console.log("hello "+name)
}

greet("harshit")

//want to set a default value
function meet(name:string = "sonu") : void{
    console.log("hey "+name)
}

meet()
meet("harshit")

function sum(a:number,b:number) : number{
    return a + b 
}
console.log(sum(20,21))

//arrow function 

const iron = (origin : string , grade : number) : object => {
    return {origin , grade}
}
console.log(iron("china",4))

//callback function 

const order = (price:number) : string => {
    return `amount ${price}`
}

function placeOrder(name : string , callback : (amount : number)=>string ){
    return `hello ${name} your have placed an order of ${callback(550)} ruppes sucessfully`
}
console.log(placeOrder("harshit",order))


//REST parametres

function total(...arr:number[]) : number{
    let ans = 0 
    arr.forEach(val => {
        ans = ans+val
    })
    return ans
}

console.log(total(24,42,131,41,53,14))




