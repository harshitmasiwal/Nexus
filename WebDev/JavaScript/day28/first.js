//callback hell

function callingDominos(callback){
    console.log("calling dominos")
    setTimeout(()=>{
        console.log("order placed sucessfully")
        callback()
    },2000)
}

function pizzaMaking(callback){
    console.log("your pizza is being prepared")
    setTimeout(()=>{
        console.log("your pizza is ready")
        callback()
    },2000)
}

function delivery(callback){
    console.log("order is picked by delivery boy")
    setTimeout(()=>{
        console.log("delivery boy reached at your location")
        callback()
    },2000)
}

function sucess(){
    console.log("verify yourself")
    setTimeout(() => {
        console.log("order delivred after verfication")
    },2000);
}

callingDominos( ()=>{
    pizzaMaking( ()=>{
        delivery( ()=>{
            sucess()
        })
    })
}) //this whole thing is called callback hell it means passing the callback inside arrow function every time


