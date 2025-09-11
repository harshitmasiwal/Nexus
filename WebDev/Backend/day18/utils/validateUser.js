const validator = require('validator')

function validateUser(data){
        const mandatoryFeild = ["firstname","email","age","password"]
        const isAllowed = mandatoryFeild.every(key => key in data)

        if(!isAllowed){
            throw new Error("Missing feilds")
        }

        //now check for the validations like the password strength and other valid email address and other stuff (use the npm i validator library) which do this all for us
        
        if(!(validator.isEmail(data.email))){
            throw new Error("Invalid email")
        }

        if(!(validator.isStrongPassword(data.password))){
            throw new Error("password should contain 1 upper case and symobl")
        }

        if(!(data.firstname.length > 3 && data.firstname.length < 20) ){
            throw new Error("the first name should have atleast 3 and less than 20 characters")
        }

        

}

module.exports = {
    validateUser
}