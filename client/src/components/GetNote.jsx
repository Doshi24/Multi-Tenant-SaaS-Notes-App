import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getnote, delnote,setCurrentNote } from "../Feactures/Note";
import url from '../utils/config.js'
import showToast from "../utils/Toast.jsx";
import { useNavigate } from "react-router-dom";


function GetNote(){
    const [activeMenu,setActiveMenu]= useState(false)
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.list);
    const navigate = useNavigate()

    useEffect(()=>{
    const getdata = async ()=>{
        try {
            const response = await fetch(`${url}/api/notes/get`,{
                method : "GET",
                headers :{
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            const res =  await response.json()
            console.log("res", res)
            if(res.status === "success"){
                dispatch(getnote(res.data))
            }else{
                showToast("unsuccess" , res.message)
                console.log("error in fetch note")
            }
        } catch (error) {
            console.log("error in fetching api" ,error.message)
        }
    };
    getdata()
    },[])

    const handleDelete = async(notedid)=>{
        try {
            // var notedid = ""
            const res = await fetch(`${url}/api/notes/delete/${notedid}`,{
                method : "DELETE",
                headers :{
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data =  await res.json()
            console.log("data", data);
            if(data.status === "success"){
                dispatch(delnote(notedid))
                
                showToast("success", data.message)
            }else{
                showToast("unsscess", data.message || "error in api ")
            }
        } catch (error) {
            showToast("unsccess", error.message)
        }

    }

  const handleEdit = (note) => {
        dispatch(setCurrentNote(note));
        navigate("/Home"); // navigate to the TodoForm page
    };


    return(
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {Array.isArray(notes) && notes.length > 0 ? (
    notes.map((note) => (
      <div
        key={note._id}
        className="bg-white rounded-lg shadow p-4 hover:shadow-md transition relative"
      >
        <h3 className="font-semibold text-gray-800 mb-2">{note.title}</h3>
        <p className="text-gray-600 mb-4">{note.content}</p>
        <p className="text-xs text-gray-400">
          Created on {new Date(note.createdAt).toLocaleDateString()}
        </p>

        {/* Edit and Delete Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => handleEdit(note)}
            className="text-blue-500 hover:text-blue-700 font-semibold text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(note._id)}
            className="text-red-500 hover:text-red-700 font-semibold text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No notes available.</p>
  )}
</div>

    )
}

export default GetNote