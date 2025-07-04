//promise are the part of web api 
//they only give an object which has 3 states
//pending
//reslove
//reject

const data = fetch(`http://api.weatherapi.com/v1/current.json?key=38e009608bb3440681f160530250207&q=delhi&aqi=no`)

// console.log(data) //Promise { <pending> }

// setTimeout(()=>{
//     console.log(data)
// },2000) //this will give output but in this case we have to manually put the time like 2sec


//to tackel this we use promise 

// data.then( ()=>{
//     console.log(data) //this will work 
// }).catch( (error)=> {
//     console.log(error)
// })


data.then( (fetcheddata)=>{
    const dataINjson = fetcheddata.json()
    dataINjson.then(()=>{
        console.log(dataINjson)   //ye bhi kyuki async task hai     
    })
})

