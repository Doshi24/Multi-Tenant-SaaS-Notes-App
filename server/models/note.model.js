import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        content : {
            type : String,
            required : true
        },
        tenantId : {    
            type : mongoose.Schema.Types.ObjectId,
            ref : "Tenant",
            required : true
        },
        userid : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        }
    },
    {timestamps : true}

)
// just like todo 

export const Note = mongoose.model("Note", noteSchema);

    