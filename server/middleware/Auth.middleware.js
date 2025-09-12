import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path : '../.env'})


const AuthMiddleware = (req,res,next)=>{
    try {
        // console.log("env"+process.env.JWT_SECRET);
        
        const authHeader = req.headers["authorization"];
        // console.log("authHeader", authHeader);
        
        if(!authHeader){
            return res.status(401).json({status : "unsuccess", message : "authorization token is missing" , data : null })
        }

        const token = authHeader.split(" ")[1];
        // console.log("token", token);
        if(!token){
            return res.status(401).json({status : "unsuccess", message : "authorization token is not in proper format" , data : null })
        }

        const dedcodetoken = jwt.verify(token , process.env.JWT_SECRET)
        // console.log("dedcodetoken", dedcodetoken);
        
        req.user = dedcodetoken
        // console.log("req.user in auth middleware", req.user);
        
    //    console.log("decoded token in auth middleware", dedcodetoken);
        next()
        // console.log("after next in auth middleware");
    } catch (error) {
        return res.status(401).json({status : "unsuccess", message : "Invalid Token" , data : null })
    }
}

export { AuthMiddleware }