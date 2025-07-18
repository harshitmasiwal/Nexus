//more about interfaces in ts

interface person {
    name : string,
    age : number,
    gender : string
    addhar?: number           //now this make the addhar as optional 
}

const p1 : person = {
    name : "harshit",
    age : 20 ,
    gender :"male"
}

const p2 : person = {
    name : "harshit",
    age : 20 ,
    gender :"male",
    addhar : 249494928292
}


// utility types for objects 

// 1 . if we want to make all the feils optional then we use partial<interface_name>
// ex : 
const p3 :Partial< person > = {
    name : "harshit",
} 
//now it will make all the blanks optional for user to fill 

// 2 . if we want to make all the feilds mandatory then we use required<interface_name>
// ex : 
const p4 :Required< person > = {
    name : "harshit",
    age : 20 ,
    gender : "male",
    addhar :294828924
} 
//now it will make all the blanks optional for user to fill even the addhar one also

// 3 . readonly doesnt allow to change the data outside the code 
// ex :
const p5 :Readonly< person > = {
    name : "harshit",
    age : 20 , 
    gender : "male"
}  
//now if i try this
// p5.name = "harshit" //this line will show me error



//extend keyword in typescript

interface human {
    name : string,
    age : number
}

interface teacher extends human{
    degree : string ,
    salary : number
}


let tech : teacher = {
    name : "anita",
    salary : 284249,
    degree : "mtech",
    age : 40
}
console.log(tech)