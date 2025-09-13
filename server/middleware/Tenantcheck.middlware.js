import {Tenant} from '../models/tenant.model.js'

const tenantCheck = async (req, res, next) => {

    try {
        const tenantid = req.user.tenantId;
        const tenant = await Tenant.findById(tenantid)

        if(!tenant){
            return res.status(400).json({status : "unsuccess", message : "Tenant does not exist please login again" , data : null })
        }
        req.tenant = tenant
        next()
    } catch (error) {
        return res.status(500).json({status : "unsuccess", message : error.message , data : null })
    }
}

export  {tenantCheck}