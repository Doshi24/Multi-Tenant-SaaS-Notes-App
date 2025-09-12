import { Tenant } from "../models/tenant.model.js";

const create_tenant = async (req, res) => {

    try {
        const {name , slugvalue , plan} = req.body

        const tenant = await Tenant.create({
            name,
            slugvalue,
            plan
        })
        return res.status(200).json({status : "success", message : "tenant created sucssefully" , data : tenant })

    } catch (error) {
        return res.status(500).json({status : "unsuccess", message : error.message , data : null })
    }

}


const update_tenant = async(req, res)=>{
    try {
        const {slugvalue} = req.params

        const searchtenant = await Tenant.findOne({slugvalue})
        if(!searchtenant){
            return res.status(404).json({status : "unsuccess", message : "tenant not found" , data : null })
        }

        if(searchtenant._id.toString() !== req.user.tenantId){
            return res.status(403).json({status : "unsuccess", message : "you are not allowed to update this tenant" , data : null })
        }

        if(searchtenant.plan === 'PRO'){
            return res.status(400).json({status : "unsuccess", message : "you are already on PRO plan" , data : null })
        }

        searchtenant.plan = 'PRO'
        await searchtenant.save()
        return res.status(200).json({status : "success", message : "tenant plan updated to PRO" , data : searchtenant })

    } catch (error) {
        return res.status(500).json({status : "unsuccess", message : error.message , data : null })
    }
}

export { create_tenant, update_tenant }