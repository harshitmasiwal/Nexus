"use strict";
//more about interfaces in ts
const p1 = {
    name: "harshit",
    age: 20,
    gender: "male"
};
const p2 = {
    name: "harshit",
    age: 20,
    gender: "male",
    addhar: 249494928292
};
// utility types for objects 
// 1 . if we want to make all the feils optional then we use partial<interface_name>
// ex : 
const p3 = {
    name: "harshit",
};
//now it will make all the blanks optional for user to fill 
// 2 . if we want to make all the feilds mandatory then we use required<interface_name>
// ex : 
const p4 = {
    name: "harshit",
    age: 20,
    gender: "male",
    addhar: 294828924
};
//now it will make all the blanks optional for user to fill even the addhar one also
// 3 . readonly doesnt allow to change the data outside the code 
// ex :
const p5 = {
    name: "harshit",
    age: 20,
    gender: "male"
};
let tech = {
    name: "anita",
    salary: 284249,
    degree: "mtech",
    age: 40
};
console.log(tech);
