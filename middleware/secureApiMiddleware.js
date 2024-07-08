
let secureApi = (req,res,next) => {
    if (req.headers.authorization == "jakariadev242") {
        next()
    }else{
        return res.send("Authorization faild")
    }
    
}

module.exports = secureApi;