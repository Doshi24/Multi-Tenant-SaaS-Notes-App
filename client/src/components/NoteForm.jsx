import React, { useState, useEffect } from "react";
import {useDispatch , useSelector} from 'react-redux'
import { addtodo, updatenote,clearCurrentNote } from "../Feactures/Note.js";
import showToast from "../utils/Toast.jsx";
import url from "../utils/config.js";
import { useNavigate } from "react-router-dom";


function TodoForm(){

    const [formdata , setformdata ] =useState({
        title : "",
        content : "",
        _id : null
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [freeAccess, setFreeAccess] = useState(false);
    const currentNote = useSelector(state => state.notes.currentNote);

    useEffect(() => {
        if (currentNote) {
            setformdata({
                title: currentNote.title,
                content: currentNote.content,
                _id: currentNote._id
            });
        }
    }, [currentNote]);

    const handleCreate= async (e) =>{
        e.preventDefault()
        if(formdata._id){
                try {
                //note update
                const response = await fetch(`${url}/api/notes/update/${formdata._id}`,{
                method : "PUT",
                headers :{
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body : JSON.stringify({title : formdata.title, content : formdata.content })
            })
                const data = await response.json()
                console.log("data for update",data)
            if (data.status === "success") {
                dispatch(updatenote(data.data))
                showToast("success", data.message || "Note Updated Successfully")
                navigate('/Home')
            }
            else{
                showToast("error", data.message || "Error Occured !!!")
            }
        } catch (error) {
            showToast("error", error.message  || "Something went Wrong")
        }}    
        else {
            try {
                //note create
                const response = await fetch(`${url}/api/notes/create`,{
                method : "POST",
                headers :{
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body : JSON.stringify({ title: formdata.title, content: formdata.content })
            })
                const data = await response.json()
                console.log("data",data)
            if (data.status === "success") {
                console.log("success")
                dispatch(addtodo(data.data))
                showToast("success", data.message || "Note Created Successfully")
                navigate('/Home')
                setformdata({ title: "", content: "", _id: null });
            }
            else{
                console.log("error")
                showToast("unsuccess", data.message || "Error Occured !!!")
            }
        } catch (error) {
            showToast("error", error.message  || "Something went Wrong")
        }}
    }
return(
<div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mb-4">
      {!freeAccess && (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4 rounded">
          <p className="font-semibold">Free Plan Limit Reached</p>
          <p className="text-sm">
            You've reached the maximum of 3 notes on the Free plan.{" "}
            <a href="/upgrade" className="underline text-orange-700 font-medium">
              Upgrade to Pro
            </a>{" "}
            for unlimited notes.
          </p>
        </div>
      )}

      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={formdata.title}
          onChange={(e) => setformdata({ ...formdata, title: e.target.value })}
          disabled={!freeAccess}
        />

        <textarea
          placeholder="Content"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
          value={formdata.content}
          onChange={(e) => setformdata({ ...formdata, content: e.target.value })}
          disabled={!freeAccess}
        />

        <button
          type="submit"
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            freeAccess ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!freeAccess}
        >
          {formdata._id ? "Update Note" : "Create Note"}
        </button>
      </form>
    </div>
)
}

export default TodoForm