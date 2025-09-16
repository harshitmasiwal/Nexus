const bcrypt = require('bcrypt')

async function hashPassword(inpPassword){

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(inpPassword,salt)

    return hashedPassword

}

module.exports = {
    hashPassword
}