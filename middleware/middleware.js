const jwt = require("jsonwebtoken")
const SECRET_KEY="NODE_API"

exports.auth = (req,res,next)=>{
    try {
        
        let token = req.headers["authorization"]
        // console.log("token------------------",token);
        if(token){
            token = token.split(" ")[1];
            // console.log("tokenaaaaaaaaaaaaaaaaaa",token);
            let user=jwt.verify(token,SECRET_KEY)
            // console.log("user------------------",user);
        }
        else{
            res.status(401).send({
                message:"unauthorised user"
            })
        }
    

    } catch (error) {
        res.status(401).send({
            message:"unauthorised user"
        })        
    }
    next()
}
