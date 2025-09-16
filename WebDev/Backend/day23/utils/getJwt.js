const jwt = require('jsonwebtoken')

async function getJwt(data){

    // console.log(data)
    const token = jwt.sign({email : data.email , phone : data.phone } , process.env.SERVER_KEY , {expiresIn : 30}) //30 seconds
    return token

}

module.exports = {
    getJwt
}