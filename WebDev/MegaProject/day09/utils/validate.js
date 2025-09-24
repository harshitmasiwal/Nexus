const Validator = require('validator')

const validate = (data)=>{


    const mandatoryFeilds = ['firstName','emailID','password']
        const isAllowed = mandatoryFeilds.every(key => key in data)

        if(!isAllowed){
            throw new Error("mandatory feilds are missing")
        }   

        if(!Validator.isEmail(data.emailID)){
            throw new Error("invalid email")
        }

        if(!Validator.isStrongPassword(data.password)){
            throw new Error("Week password")
        }

        if(data.firstName.length < 2 || data.firstName.length > 21){
            throw new Error("firstName can only contain 2-20 characters")
        }

        if(data.lastName.length < 2 || data.lastName.length > 21){
            throw new Error("lastName can only contain 2-20 characters")
        }

        if(data.age < 10 || data.age > 100){
            throw new Error("age can only be between 10-100")
        }

}

module.exports = validate