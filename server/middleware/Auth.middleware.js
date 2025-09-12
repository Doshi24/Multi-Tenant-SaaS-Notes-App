import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path : '../.env'})


const AuthMiddleware = (req,res,next)=>{
    try {
        
        const authHeader = req.headers["authorization"];
        if(!authHeader){
            return res.status(401).json({status : "unsuccess", message : "authorization token is missing" , data : null })
        }

        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({status : "unsuccess", message : "authorization token is not in proper format" , data : null })
        }

        const dedcodetoken = jwt.verify(token , process.env.JWT_SECRET_KEY)
        req.user = dedcodetoken
        next()
    } catch (error) {
        return res.status(401).json({status : "unsuccess", message : "Invalid Token" , data : null })
    }
}

export { AuthMiddleware }