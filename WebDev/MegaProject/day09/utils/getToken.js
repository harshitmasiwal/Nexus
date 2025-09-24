const jwt = require('jsonwebtoken')

const getToken = (payload)=>{

    const token = jwt.sign(payload , "masiwal" , {expiresIn : 60*60*24})
    return token
}
module.exports =  getToken