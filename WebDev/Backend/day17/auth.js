const bcrypt = require('bcrypt')

const actualPass = "Harshit@12"
// const inputPass = "Harshit@12"
const inputPass = "masiwal@12"



async function auth(){
    
    const salt = await bcrypt.genSalt(12)
    const hashedPass = await bcrypt.hash(actualPass,salt)

    console.log(hashedPass)

    const isAllowed = await bcrypt.compare(inputPass,hashedPass) //it will do all the comapring part 

    console.log(isAllowed)

}

auth()