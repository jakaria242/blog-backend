const bcrypt = require('bcrypt');
const User = require('../model/registrationModel')
const nodemailer = require("nodemailer");

 const emailpattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


let registration = async (req,res) => {
    const {name, email, password} = req.body
    if (name === "" || name == undefined) {
     return res.send("Name is required")
    }
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

      if (existingUser != null) {
        return res.send("User alredy exist")
      }
        bcrypt.hash(password, 10, async function(err, hash) {
          const registration = new User ({
            name: name,
            email: email,
            password : hash
         })
         registration.save()

         const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "jakaria.dev242@gmail.com",
            pass: "xemd cwgc nhgf jsns",
          },
        });
        
          const info = await transporter.sendMail({
            from: 'myblog', // sender address
            to: registration.email, // list of receivers
            subject: "Email Verification Link", // Subject line
            html: `<body style=margin:0;padding:0;box-sizing:border-box><table style="padding:40px;max-width:1024px;margin:0 auto"border=0 cellpadding=0 cellspacing=0 width=100%><tr><td><table style="padding:40px;max-width:1024px;margin:0 auto"style=width:100%;margin-bottom:20px border=0 cellpadding=0 cellspacing=0 width=100%><tr><td style=width:150px><h1 border=0 style=color:#fc0644 width=90%>User</h1><br><td style="background-color:#8a2be2;color:#fff;padding:40px 20px;text-align:left"><h3 style=font-size:40px;margin:0;padding:0> Hey! ${registration.name} Verify your Link: <a href="http://localhost:8000/${registration.email}">Click Here</a></h3></table></table>`, // html body
          });
          console.log("Message sent: %s", info.messageId);

          res.send({
            message: " Registration Successfull",
            id: registration._id,
            name: registration.name,
            email: registration.email
          } )
      });

   

}

module.exports = registration;