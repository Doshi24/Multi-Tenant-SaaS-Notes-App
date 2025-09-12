import mongoose from "mongoose";


const tenantSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        slugvalue : {
            type : String,
            required : true,
        },
        plan : {
            type : String,
            enum : ['FREE', 'PRO'],
            default : 'FREE'
        }
    },
    {
        timestamps : true
    }
)

 export const Tenant = mongoose.model("Tenant", tenantSchema)