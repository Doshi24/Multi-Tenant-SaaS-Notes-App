
const checkadmin = (req,res,next)=>{
    if(req.user.role !=='ADMIN'){
        return res.status(403).json({status : "unsuccess", message : "Access forbidden: Admins only" , data : null })
    }
    next()
}


export {checkadmin}