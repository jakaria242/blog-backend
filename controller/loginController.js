const bcrypt = require('bcrypt');
const User = require("../model/registrationModel")
const emailpattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let login = async (req,res) => {
    const {email, password} = req.body
    if(email === "" || email == undefined){
        return res.send("Email is required")
      }
      if(!emailpattern.test(email)){
          return res.send("Invalid email")
        }
       if(password === ""  || password == undefined){
        return res.send("Password is required")
      }
      let existingUser = await User.findOne({email:email})

      if (existingUser == null) {
       return  res.send("We can not find any account in this email")
      }
      bcrypt.compare(password, existingUser.password, function(err, result) {
       if (result) {
         if (existingUser.emailVerify) {
          return res.send({
            message: " Login Successfull",
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email
        })
         } else {
          return res.send("Please verify your email")
         }
       } else {
        return res.send("Wrong password")
       }
    });
}
module.exports = login