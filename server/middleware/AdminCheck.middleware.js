
const checkadmin = (req,res,next)=>{
    // console.log("Inside checkadmin middleware → req.user:", req.user);
    if(req.user.role !=='ADMIN'){
        // console.log("User role is not admin", req.user.role);
        // console.log("req", req);
        return res.status(403).json({status : "unsuccess", message : "Access forbidden: Admins only" , data : null })
    }
    next()
}


export {checkadmin}