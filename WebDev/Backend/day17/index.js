const bcrypt = require('bcrypt')


const password = "harshit@12"

async function genHash(){
    console.time("salt")
    const salt = await bcrypt.genSalt(12)
    console.timeEnd("salt")
    console.time("password+hash")
    const finalHash = await bcrypt.hash(password,salt)  // with salt
    // const finalHash = await bcrypt.hash(password,10 (rounds without salt ))
    console.timeEnd("password+hash")
    console.log(salt)
    console.log(finalHash) 
}

genHash()