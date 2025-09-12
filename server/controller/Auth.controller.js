import {User} from '../models/user.model.js'
import {Tenant} from '../models/tenant.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({
    path : '../.env'
})

const register = async (req , res)=>{
    try {
        const {email , Password, tenantId ,role} = req.body
        
        const existtenant = await Tenant.findOne({slug: tenantId})
        if(existtenant){
            return res.status(400).json({status : "unsuccess", message : "Tenant does not exist"+tenant , data : null })
        }
        console.log("existtenant", existtenant);
        

        const existeduser = await User.findOne({email})
        if(existeduser){
            return res.status(400).json({status : "unsuccess", message : "User already exist with email" +email , data : null })
        }

        console.log("passowrd with out hash", Password)
        const hashedpass = await bcrypt.hash(Password, 10)
        console.log("hashed password", hashedpass)

        const newuser = await User.create({
            email,
            Password : hashedpass,
            tenantId,
            role
        })

        return res.status(201).json({status : "success", message : "User registered successfully with Email " +email , data : newuser })

    } catch (error) {
        return res.status(500).json({status : "unsuccess", message : error.message , data : null })
    }
}


const login = async (req, res)=>{
    try {
        const {email , Password} = req.body

        const finduser = await User.findOne({email})
        if(!finduser){
            return res.status(400).json({status : "unsuccess", message : "User does not exist with email" + email , data : null })
        }

        const passmatch = await bcrypt.compare(Password , finduser.Password)
        if(!passmatch){
            return res.status(400).json({status : "unsuccess", message : "Password is incorrect" , data : null })
        }

        const sendjwt = jwt.sign(
            {userid : finduser._id }, process.env.JWT_SECRET,{expiresIn : '1h'}

        )

        return res.status(200).json({status : "success", message : "User logged in successfully" , data : {user : finduser, token : sendjwt} })
    } catch (error) {
     return res.status(500).json({status : "unsuccess", message : error.message , data : null })   
    }
}

export { register , login }