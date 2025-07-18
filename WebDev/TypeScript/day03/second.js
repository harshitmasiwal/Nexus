"use strict";
// array of objects 
const arr = [{ name: "jiya", age: 20 }, { name: "sonu", age: 30 }];
const newarr = [{ name: "jiya", age: 20 }, { name: "sonu", age: 30 }];
//functions in ts
function greet(name) {
    console.log("hello " + name);
}
greet("harshit");
//want to set a default value
function meet(name = "sonu") {
    console.log("hey " + name);
}
meet();
meet("harshit");
function sum(a, b) {
    return a + b;
}
console.log(sum(20, 21));
//arrow function 
const iron = (origin, grade) => {
    return { origin, grade };
};
console.log(iron("china", 4));
//callback function 
const order = (price) => {
    return `amount ${price}`;
};
function placeOrder(name, callback) {
    return `hello ${name} your have placed an order of ${callback(550)} ruppes sucessfully`;
}
console.log(placeOrder("harshit", order));
//REST parametres
function total(...arr) {
    let ans = 0;
    arr.forEach(val => {
        ans = ans + val;
    });
    return ans;
}
console.log(total(24, 42, 131, 41, 53, 14));
