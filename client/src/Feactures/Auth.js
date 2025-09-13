import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    token : null,
    loading : false,
    error : null
}

const AuthSlice = createSlice({
    name : "auth",
    initialState,
    reducers :{
        logout : (state, action)=>{
            state.user = null,
            state.token = null, 
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        },
        login :(state, action)=>{
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem("token",action.payload.token)
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        },
        register :(state, action)=>{
            state.user = action.payload.user
            // state.token = action.payload.token
            // localStorage.setItem("token",action.payload.token)
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        }
    }
})


export  const {login,logout, register} = AuthSlice.actions
export default AuthSlice.reducer 