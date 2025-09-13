import { Note } from "../models/note.model.js";


const createtrnant = async (req, res) => {
    try {
        const {title , content } = req.body;
        // console.log("req.body", req);
        

        if(!title || !content){
            return res.status(400).json({ status : unsuccess, message : "All fields are required", data : null})
        }

        const note = await Note.create({
            title,
            content,
            tenantId : req.tenant._id,
            userid : req.user.userid
        })
        return res.status(201).json({ status : "success", message : "Note created successfully", data : note})
    } catch (error) {
        return res.status(500).json({ status : "unsuccess", message : error.message, data : null})
    }
}


const getnotes = async (req, res) => {
    try {
        const notes = await Note.find({ tenantId : req.tenant._id})
        return res.status(200).json({ status : "success", message : "Notes fetched successfully", data : notes})
    } catch (error) {
        return res.status(500).json({ status : "unsuccess", message : error.message, data : null})
    }
}


const getnotebyid = async(req,res)=>{

    try {
        const {id }  = req.params
        const note = await Note.findById(id)
        if(!note){
            return res.status(404).json({ status : "unsuccess", message : "Note not found", data : null})
        }
        if(note.tenantId.toString() !== req.tenant._id.toString()){
            return res.status(403).json({ status : "unsuccess", message : "You are not authorized to access this note", data : null})
        }
        return res.status(200).json({ status : "success", message : "Note fetched successfully", data : note})

    } catch (error) {
        return res.status(500).json({ status : "unsuccess", message : error.message, data : null})
    }
}

const updatenote = async(req, res)=>{
    try {
        
        const {id} = req.params
        const {title, content} = req.body

        const note = await Note.findById(id)
        if(!note){
            return res.status(404).json({ status : "unsuccess", message : "Note not found", data : null})
        }
        if(note.tenantId.toString() !== req.tenant._id.toString()){
            return res.status(403).json({ status : "unsuccess", message : "Access forbidden: tenant mismatch", data : null})
        }
        note.title = title || note.title;
        note.content = content || note.content;
        await note.save();

        return res.status(200).json({ status : "success", message : "Note updated successfully", data : note})

    } catch (error) {
        return res.status(500).json({ status : "unsuccess", message : error.message, data : null})        
    }
}


const deleteNote = async(req, res)=>{
    try {
        const {id} = req.params
        const note = await Note.findById(id)
        if(!note){
            return res.status(404).json({ status : "unsuccess", message : "Note not found", data : null})
        }

        if(note.tenantId.toString() !== req.tenant._id.toString()){
            return res.status(403).json({ status : "unsuccess", message : "Access forbidden: tenant mismatch", data : null})
        }
        await note.remove();
        return res.status(200).json({ status : "success", message : "Note deleted successfully", data : null})
    } catch (error) {
        return res.status(500).json({ status : "unsuccess", message : error.message, data : null})
    }
}


export { createtrnant, getnotes, getnotebyid, updatenote, deleteNote }