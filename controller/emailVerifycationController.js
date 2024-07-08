let User = require("../model/registrationModel")

let emailVerifycationController = async (req,res) => {

        let existingUser = await User.findOneAndUpdate({email: req.params.email},{emailVerify: true}, { new:true })
        
        if (existingUser == null) { 
            return res.send("Email not found")
        } else {
            return res.send("Email Verified")
        }

}

module.exports = emailVerifycationController