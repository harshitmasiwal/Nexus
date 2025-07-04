// //callback hell

// function callingDominos(callback){
//     console.log("calling dominos")
//     setTimeout(()=>{
//         console.log("order placed sucessfully")
//         callback()
//     },2000)
// }

// function pizzaMaking(callback){
//     console.log("your pizza is being prepared")
//     setTimeout(()=>{
//         console.log("your pizza is ready")
//         callback()
//     },2000)
// }

// function delivery(callback){
//     console.log("order is picked by delivery boy")
//     setTimeout(()=>{
//         console.log("delivery boy reached at your location")
//         callback()
//     },2000)
// }

// function sucess(){
//     console.log("verify yourself")
//     setTimeout(() => {
//         console.log("order delivred after verfication")
//     },2000);
// }

// callingDominos( ()=>{
//     pizzaMaking( ()=>{
//         delivery( ()=>{
//             sucess()
//         })
//     })
// }) //this whole thing is called callback hell it means passing the callback inside arrow function every time

//resloving this using promises

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
    callpick = false
    if (callpick) {
      setTimeout(() => {
        console.log("order delivred after verfication");
      }, 2000);
      resolve("done");
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
//this will not handel errors to handel them we use this

async function food() {
  try{

    foodDetails = await callingDominos(cart)
    pickme = await pizzaMaking(foodDetails)
    otp = await delivery(pickme)
    final = await sucess(otp)
    console.log(final)
  }
  catch(error){
    console.log(error)
  }
}

food()