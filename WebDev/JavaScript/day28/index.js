//callback function 

function fetchUser(callback){

    console.log("fetching user data ....")
    const user = {
        name : 'harshit',
        age : 19,
    }
    setTimeout(()=>{
        console.log("data fetched sucessfully")
        callback(user)
    },2000)
}

function printname(user){
    console.log(`user name is ${user.name}`)
}

function printage(user){
    console.log(`user age is ${user.age}`)
}

fetchUser(printname) //for diffrent i dont have to write the whole function fetchuser twice 
fetchUser(printage) //instead i used callback by passing printage , printname function to fetchuser and then callled it inside fetch user 


