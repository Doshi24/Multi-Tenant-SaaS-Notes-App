import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list :[],
    currentNote: null, 
}

export const  noteslice = createSlice({
    name : "notes",
    initialState,
    reducers :{
        addtodo : (state, action)=>{
            state.list.push(action.payload)
        },
        getnote :(state, action)=>{
            state.list  =  action.payload
        },
        delnote :(state, action)=>{
            state.list = state.list.filter(note => note._id !== action.payload)
        },
        updatenote: (state, action) => {
            const index = state.list.findIndex(note => note._id === action.payload._id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        setCurrentNote: (state, action) => {
            state.currentNote = action.payload;
        },
        clearCurrentNote: (state) => {
            state.currentNote = null;
        },
    }
})


export const { addtodo , getnote, delnote, updatenote, setCurrentNote,clearCurrentNote} = noteslice.actions

export default noteslice.reducer