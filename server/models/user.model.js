import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true
        },
        Password : {
            type : String,
            required : true
        },
        role : {
            type : String,
            enum : ['ADMIN', 'MEMBER'],
            required : true
        }, 
        tenantId : {
            // type : String,
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Tenant",
            required : true
        }
    },
    {
        timestamps : true
    }
)

 export const User = mongoose.model("User", userSchema)