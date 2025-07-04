//using asyncs await instead of promise chaning 
const cart = ["pizza", "coke", "burger"];

function callingDominos(cart) {
  console.log("calling dominos");

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let items_avilable = true;
      if (items_avilable) {
        const foodDetails = { token: 12, items: cart };
        console.log("order placed sucessfully");
        resolve(foodDetails);
      } else {
        reject("resturant declined items not avialable");
      }
    }, 2000);
  });

  return promise
}

function pizzaMaking(foodDetails) {
  console.log("your pizza is being prepared");
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const pickme = "haldiram resturant";
      console.log("your pizza is ready");
      resolve(pickme);
    }, 2000);
  });
  return promise

}

function delivery(pickme) {
  console.log("order is picked by delivery boy");

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("delivery boy reached at your location");
      const otp = "3928";
      resolve(otp);
    }, 2000);
  });
  return promise

}

function sucess(otp) {
  console.log("verify yourself");

  const promise = new Promise((resolve, reject) => {
    callpick = true
    if (callpick) {
      setTimeout(() => {
        console.log("order delivred after verfication");
      }, 2000);
      resolve(console.log("done"));
    }
    else{
        reject("ye call hi nahi utha rhaa ")
    }
  });
  return promise

}

// callingDominos(cart)
// .then(foodDetails=>pizzaMaking(foodDetails))
// .then(pickme=>delivery(pickme))
// .then(otp=>sucess(otp))
// .catch((error)=>{
//     console.log(error)
// }) ////this promise chaning was hard to undertand so we use async await

// async function food(cart){
//     foodDetails = await callingDominos(cart)
//     pickme = await pizzaMaking(foodDetails)
//     otp = await delivery(pickme)
//     sucess(otp)
// }

// food()  using simple async and await 


function test1(){
  const p1 = new Promise(function(resolve,reject){
    setTimeout(()=>{
        resolve("hello form p1")
    },5000)
})
return p1

}
// console.log("midd")

function test2(){
    
      const p2 = new Promise(function(resolve,reject){
       setTimeout(()=>{
        resolve("hello form p2")
    },3000)
})

return p2
}





// console.log(p1) pending 

// p1.then(response=>console.log(response))   

//resolving this using async wait 

// async function greet(){
//   const data1 = await test1()
//   console.log(data1)

//   const data2 = await test2()
//   console.log(data2)   
             
// }

//if we want to execute both the function parallel 

async function greet() {
  
  const [data1,data2 ] = await Promise.all([test1(),test2()])
  console.log(data1,data2) //max time jo function lega tab result ayega
}

greet()
console.log("kese hoo")


