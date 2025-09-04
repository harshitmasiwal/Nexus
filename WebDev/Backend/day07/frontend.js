
//ham do type se fetch request bhejte hai 

// 1. Simple GET request using fetch API

fetch("https://www.xyz.com")

// 2. POST request (REST API style) using fetch API

fetch("https://www.xyz.com",{
    method:"POST",
    headers:{
        'Content-Type' : 'application/json'    // Server isi format me data ko parse karega.
        //yeh request ke body ka format batata hai (hum bhej kya rahe hain), na ki humein receive kya ho raha hai. Response ka format check karne ke liye usually response.headers.get("Content-Type") use karte hain.
    },
    body : JSON.stringify({name:"harshit",age:20}) //stringify use hota hai joki hamare js ke object ko convert kar deta hai valid json string mai (deatil ke lisye check the diffrence btw the js and json(java script object notation) object )
    //JSON (JavaScript Object Notation) ek lightweight data format hai, 
    // jo JS object se similar lagta hai lekin keys hamesha double quotes me hoti hain.
    //JSON ek string hoti hai jo data ko transfer ke liye hoti hai, JS object runtime me memory structure hota hai.
})
