//if else , switch  and loops

let a = 10 

if(a > 5) {
    console.log("this is if block ")
} 
else {
    console.log("this is else block")
}

//switch statement - printing the today day

switch(new Date().getDay()){
    case 0:
        console.log("sunday")
        break
    case 1:
        console.log("monday")
        break
    case 2:
        console.log("tuesday")
        break
    case 3:
        console.log("wednesday")
        break
    case 4:
        console.log("thursday")
        break
    case 5:
        console.log("friday")
        break
    case 6:
        console.log("saturday")
        break
    default:
        console.log("error occured in code")
}

//the switch uses strict comparision which means (===) if we use "0" in input and inn case 0 this will didnt work out

// loops
let sum = 0
for(let i = 0 ; i < 10 ; i++){
    sum += i
}
console.log(sum)

let i = 10
while(i > 5){
    console.log(i--)
}

